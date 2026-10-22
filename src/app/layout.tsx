import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { StoreProvider } from '@/context/store-context';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QuoteDrawer from '@/components/QuoteDrawer';
import Toast from '@/components/Toast';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'VOLT — Technology, Beyond Ordinary | Digital 3D Showroom',
  description: 'An immersive digital showroom showcasing three flagship electronic instruments engineered with aerospace materials, custom silicon, and uncompromised precision.',
  keywords: ['VOLT', 'Electronics', 'Flagship Smartphone', 'Wireless Headphones', 'Smartwatch', '3D E-Commerce', 'Awwwards'],
  authors: [{ name: 'VOLT Hardware Labs' }],
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#050811] text-[#f5f5f7] font-sans antialiased selection:bg-[#2997ff] selection:text-white">
        <StoreProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <QuoteDrawer />
          <Toast />
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
