/**
 * Visual Audit Script for Antigravity Web Projects
 * Automatically captures settled Desktop (1440x950) and Mobile (390x844) screenshots via Chrome CDP.
 */

const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = process.env.PORT || 3001;
const TARGET_URL = `http://localhost:${PORT}/`;
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'showcase');

async function runAudit() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const desktopPath = path.join(OUTPUT_DIR, 'audit-desktop.png');
  const mobilePath = path.join(OUTPUT_DIR, 'audit-mobile.png');
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'chrome_audit_'));

  console.log(`[Visual Audit] Launching isolated headless Chrome on port 9245 for ${TARGET_URL}...`);

  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9245',
    '--no-sandbox',
    '--disable-gpu',
    `--user-data-dir=${tempDir}`,
    '--incognito',
    TARGET_URL
  ]);

  await new Promise((r) => setTimeout(r, 2500));

  http.get('http://127.0.0.1:9245/json/list', (res) => {
    let raw = '';
    res.on('data', (c) => raw += c);
    res.on('end', async () => {
      try {
        const tabs = JSON.parse(raw);
        const targetTab = tabs.find((t) => t.type === 'page' && t.url.includes(`localhost:${PORT}`));
        
        if (!targetTab) {
          throw new Error('Target page tab not found');
        }

        const ws = new WebSocket(targetTab.webSocketDebuggerUrl);

        let step = 0;
        function send(method, params = {}) {
          step++;
          ws.send(JSON.stringify({ id: step, method, params }));
          return step;
        }

        function evaluate(expression) {
          return send('Runtime.evaluate', { expression, awaitPromise: true });
        }

        let stage = 'init';

        ws.onopen = () => {
          send('Page.enable');
          // 1. Set Desktop Viewport
          send('Emulation.setDeviceMetricsOverride', {
            width: 1440,
            height: 950,
            deviceScaleFactor: 1,
            mobile: false,
          });

          // Ensure scrolled to top (0,0) and allow animations to settle
          setTimeout(() => {
            evaluate('window.scrollTo(0,0);');
            stage = 'desktop';
            setTimeout(() => {
              send('Page.captureScreenshot', { format: 'png' });
            }, 1800);
          }, 1000);
        };

        ws.onmessage = (event) => {
          const msg = JSON.parse(event.data);

          if (msg.result?.data) {
            if (stage === 'desktop') {
              fs.writeFileSync(desktopPath, Buffer.from(msg.result.data, 'base64'));
              console.log(`[Visual Audit] Desktop screenshot saved: ${desktopPath}`);

              stage = 'mobile';
              // 2. Set Mobile Viewport: 390 x 844
              evaluate('window.scrollTo(0,0);');
              send('Emulation.setDeviceMetricsOverride', {
                width: 390,
                height: 844,
                deviceScaleFactor: 2,
                mobile: true,
              });

              setTimeout(() => {
                evaluate('window.scrollTo(0,0);');
                setTimeout(() => {
                  send('Page.captureScreenshot', { format: 'png' });
                }, 1500);
              }, 500);
            } else if (stage === 'mobile') {
              fs.writeFileSync(mobilePath, Buffer.from(msg.result.data, 'base64'));
              console.log(`[Visual Audit] Mobile screenshot saved: ${mobilePath}`);
              console.log('[Visual Audit] Audit complete. Ready for view_file inspection.');
              ws.close();
              chrome.kill();
              try { fs.rmSync(tempDir, { recursive: true, force: true }); } catch (_) {}
              process.exit(0);
            }
          }
        };
      } catch (e) {
        console.error('[Visual Audit] Failed parsing tabs or connecting:', e.message);
        chrome.kill();
        process.exit(1);
      }
    });
  }).on('error', (err) => {
    console.error('[Visual Audit] Chrome connection error:', err.message);
    chrome.kill();
    process.exit(1);
  });
}

runAudit();
