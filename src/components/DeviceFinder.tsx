'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { productsData } from '@/data/products';
import { Product, ProductCategory } from '@/types/product';
import { 
  Sparkles, 
  HelpCircle, 
  CheckCircle, 
  ArrowLeft, 
  RotateCcw, 
  Smartphone, 
  Laptop, 
  Tablet, 
  Watch, 
  Headphones,
  Check,
  Cpu,
  BatteryCharging,
  Eye,
  Camera
} from 'lucide-react';

interface FinderPreferences {
  category: ProductCategory | 'any';
  budget: 'under-2000' | '2000-5000' | 'above-5000' | 'any';
  primaryUse: 'gaming' | 'creators' | 'business' | 'daily' | 'audio';
  priority: 'battery' | 'performance' | 'screen' | 'camera';
}

export default function DeviceFinder() {
  const [step, setStep] = useState<number>(1);
  const [prefs, setPrefs] = useState<FinderPreferences>({
    category: 'smartphones',
    budget: '2000-5000',
    primaryUse: 'daily',
    priority: 'performance',
  });
  const [recommendations, setRecommendations] = useState<{ product: Product; matchScore: number; reason: string }[]>([]);
  const [hasCalculated, setHasCalculated] = useState(false);

  const calculateRecommendations = () => {
    const scored = productsData.map((prod) => {
      let score = 0;
      const reasons: string[] = [];

      // 1. Category matching
      if (prefs.category === 'any' || prod.category === prefs.category) {
        score += 40;
      } else {
        score -= 20;
      }

      // 2. Budget matching
      if (prefs.budget === 'under-2000' && prod.price <= 2000) {
        score += 30;
        reasons.push('يتطابق تماماً مع حدود ميزانيتك الاقتصادية');
      } else if (prefs.budget === '2000-5000' && prod.price > 2000 && prod.price <= 5000) {
        score += 30;
        reasons.push('يقع في النطاق السعري المتوسط المثالي للقيمة');
      } else if (prefs.budget === 'above-5000' && prod.price > 5000) {
        score += 30;
        reasons.push('فئة رائدة تلبي أعلى متطلبات العتاد المتقدم');
      } else if (prefs.budget === 'any') {
        score += 15;
      }

      // 3. Primary use matching
      if (prod.targetUse === prefs.primaryUse) {
        score += 25;
        if (prefs.primaryUse === 'gaming') reasons.push('عتاد معالجة رسوميات وشاشة بتردد عالٍ ملائمة للألعاب');
        if (prefs.primaryUse === 'creators') reasons.push('شاشة بألوان دقيقة ومعالجة عالية لمونتاج وتصميم المحتوى');
        if (prefs.primaryUse === 'business') reasons.push('وزن خفيف وبطارية طويلة واستقرار مكتبي عالي');
        if (prefs.primaryUse === 'daily') reasons.push('توازن عملي بين سرعة الاستجابة وسلاسة المهام اليومية');
        if (prefs.primaryUse === 'audio') reasons.push('نظام صوتي متقدم مع إلغاء ضوضاء نشط');
      }

      // 4. Priority matching
      if (prefs.priority === 'battery') {
        if (prod.specs.battery.includes('يوم') || prod.specs.battery.includes('5000') || prod.specs.battery.includes('60') || prod.specs.battery.includes('18')) {
          score += 20;
          reasons.push('سعة بطارية فائقة تمتد لفترات تشغيل طويلة');
        }
      } else if (prefs.priority === 'performance') {
        if (prod.specs.processor.includes('Extreme') || prod.specs.processor.includes('Ultra 9') || prod.specs.processor.includes('Gen 3') || prod.specs.processor.includes('3nm')) {
          score += 20;
          reasons.push(`قوة معالجة فائقة بفضل معالج ${prod.specs.processor.split('(')[0]}`);
        }
      } else if (prefs.priority === 'screen') {
        if (prod.specs.screenType.includes('AMOLED') || prod.specs.screenType.includes('OLED')) {
          score += 20;
          reasons.push('شاشة OLED/AMOLED بأعلى تباين وألوان واقعية');
        }
      } else if (prefs.priority === 'camera') {
        if (prod.specs.mainCamera && (prod.specs.mainCamera.includes('200MP') || prod.specs.mainCamera.includes('108MP') || prod.specs.mainCamera.includes('OIS'))) {
          score += 20;
          reasons.push('مستشعر كاميرا فائق الدقة مع مانع اهتزاز بصري');
        }
      }

      const reasonSummary = reasons.length > 0 
        ? reasons.slice(0, 2).join('، مع ') 
        : `خيار متوازن ومناسب لفئة ${prod.category} حسب المواصفات الفنية المعتمدة.`;

      return {
        product: prod,
        matchScore: Math.min(100, Math.max(10, score)),
        reason: reasonSummary,
      };
    });

    scored.sort((a, b) => b.matchScore - a.matchScore);
    setRecommendations(scored.slice(0, 3));
    setHasCalculated(true);
  };

  const handleReset = () => {
    setStep(1);
    setHasCalculated(false);
  };

  return (
    <section id="device-finder" className="my-16 max-w-5xl mx-auto px-4 sm:px-6">
      <div className="bg-gradient-to-br from-slate-900 via-[#0f2b48] to-[#0a1f33] rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        
        {/* Glow ambient background accents */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="relative z-10 text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-400/10 border border-sky-400/20 text-sky-300 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>مساعد القرار التقني الذكي</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            مساعد اختيار الجهاز الأنسب لاحتياجك وميزانيتك
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            أجب عن 4 أسئلة سريعة لنقوم بتحليل المواصفات المتاحة وترشيح الأجهزة المطابقة لقواعدك مع شرح سبب التوصية.
          </p>
        </div>

        {/* Step Progression Bar */}
        {!hasCalculated && (
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-8">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setStep(s)}
                  className={`w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center transition-all ${
                    step === s
                      ? 'bg-sky-400 text-slate-950 ring-4 ring-sky-400/20'
                      : step > s
                      ? 'bg-sky-900 text-sky-200'
                      : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {step > s ? <Check className="w-4 h-4" /> : s}
                </button>
                {s < 4 && <div className={`w-6 sm:w-12 h-0.5 ${step > s ? 'bg-sky-800' : 'bg-slate-800'}`} />}
              </div>
            ))}
          </div>
        )}

        {/* Interactive Steps */}
        {!hasCalculated ? (
          <div className="relative z-10 bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-xs">
            
            {/* Step 1: Device Category */}
            {step === 1 && (
              <div>
                <h3 className="text-lg font-bold mb-1 flex items-center gap-2">
                  <span className="text-sky-400">1.</span> ما نوع الجهاز الذي تبحث عنه؟
                </h3>
                <p className="text-xs text-slate-400 mb-6">حدد الفئة الأساسية لتضييق نطاق المواصفات.</p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'smartphones', name: 'هاتف ذكي', icon: Smartphone },
                    { id: 'laptops', name: 'حاسوب محمول', icon: Laptop },
                    { id: 'tablets', name: 'جهاز لوحي', icon: Tablet },
                    { id: 'wearables', name: 'ساعة ذكية', icon: Watch },
                    { id: 'audio', name: 'سماعات وصوتيات', icon: Headphones },
                    { id: 'any', name: 'استكشاف جميع الفئات', icon: Sparkles },
                  ].map((item) => {
                    const Icon = item.icon;
                    const selected = prefs.category === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setPrefs({ ...prefs, category: item.id as any })}
                        className={`p-4 rounded-xl border text-right transition-all flex flex-col justify-between h-28 ${
                          selected
                            ? 'bg-sky-500/20 border-sky-400 text-white ring-2 ring-sky-400/40'
                            : 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <Icon className={`w-6 h-6 ${selected ? 'text-sky-300' : 'text-slate-400'}`} />
                        <span className="font-bold text-sm">{item.name}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl text-sm transition-all"
                  >
                    التالي: تحديد الميزانية ←
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Budget */}
            {step === 2 && (
              <div>
                <h3 className="text-lg font-bold mb-1 flex items-center gap-2">
                  <span className="text-sky-400">2.</span> ما هي ميزانيتك التقريبية المتوقعة؟
                </h3>
                <p className="text-xs text-slate-400 mb-6">سنرشح أفضل أجهزة تقدم أعلى قيمة ضمن هذا النطاق.</p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'under-2000', title: 'اقتصادية', desc: 'أقل من 2,000 ر.س', note: 'تركيز على الأساسيات والبطارية' },
                    { id: '2000-5000', title: 'متوسطة / متقدمة', desc: 'من 2,000 إلى 5,000 ر.س', note: 'المعادلة الأقوى بين الأداء والسعر' },
                    { id: 'above-5000', title: 'رائدة وفائقة', desc: 'أكثر من 5,000 ر.س', note: 'أحدث المعالجات وأعلى المواد الفضائية' },
                  ].map((b) => {
                    const selected = prefs.budget === b.id;
                    return (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => setPrefs({ ...prefs, budget: b.id as any })}
                        className={`p-5 rounded-xl border text-right transition-all flex flex-col justify-between ${
                          selected
                            ? 'bg-sky-500/20 border-sky-400 text-white ring-2 ring-sky-400/40'
                            : 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <div>
                          <div className="font-extrabold text-base mb-1">{b.title}</div>
                          <div className="text-sky-300 font-bold text-sm mb-2">{b.desc}</div>
                        </div>
                        <div className="text-xs text-slate-400">{b.note}</div>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-8 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-2 text-slate-400 hover:text-white text-xs font-semibold"
                  >
                    → السابق
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-6 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl text-sm transition-all"
                  >
                    التالي: الاستخدام الأساسي ←
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Primary Use */}
            {step === 3 && (
              <div>
                <h3 className="text-lg font-bold mb-1 flex items-center gap-2">
                  <span className="text-sky-400">3.</span> ما هو استخدامك الأساسي للجهاز؟
                </h3>
                <p className="text-xs text-slate-400 mb-6">يساعدنا ذلك في اختيار تركيبة المعالج والذاكرة والتبريد.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'gaming', title: 'ألعاب ثقيلة وتنافسية', desc: 'أولوية لمعدل الإطارات 120Hz/144Hz وقوة الجرافيكس' },
                    { id: 'creators', title: 'صناعة محتوى وتصميم ومونتاج', desc: 'أولوية لدقة الألوان، الذاكرة العشوائية وسرعة التصدير' },
                    { id: 'business', title: 'عمل مكتبي واجتماعات وتنقل', desc: 'أولوية للوزن الخفيف، الهدوء، واستقرار النظام' },
                    { id: 'daily', title: 'دراسة وتصفح واستخدام يومي', desc: 'أولوية لعمر البطارية والاعتمادية طويلة الأمد' },
                  ].map((u) => {
                    const selected = prefs.primaryUse === u.id;
                    return (
                      <button
                        key={u.id}
                        type="button"
                        onClick={() => setPrefs({ ...prefs, primaryUse: u.id as any })}
                        className={`p-4 rounded-xl border text-right transition-all ${
                          selected
                            ? 'bg-sky-500/20 border-sky-400 text-white ring-2 ring-sky-400/40'
                            : 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <div className="font-bold text-sm mb-1">{u.title}</div>
                        <div className="text-xs text-slate-400">{u.desc}</div>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-8 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-4 py-2 text-slate-400 hover:text-white text-xs font-semibold"
                  >
                    → السابق
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="px-6 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl text-sm transition-all"
                  >
                    التالي: الأولوية التقنية ←
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Technical Priority */}
            {step === 4 && (
              <div>
                <h3 className="text-lg font-bold mb-1 flex items-center gap-2">
                  <span className="text-sky-400">4.</span> ما هي الميزة التقنية الأكثر أهمية بالنسبة لك؟
                </h3>
                <p className="text-xs text-slate-400 mb-6">سيعطي النظام وزناً إضافياً لهذه المواصفة في التقييم.</p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'performance', title: 'أعلى سرعة وأداء', icon: Cpu },
                    { id: 'battery', title: 'أطول عمر بطارية', icon: BatteryCharging },
                    { id: 'screen', title: 'شاشة سينمائية نقية', icon: Eye },
                    { id: 'camera', title: 'كاميرات وتصوير احترافي', icon: Camera },
                  ].map((p) => {
                    const Icon = p.icon;
                    const selected = prefs.priority === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPrefs({ ...prefs, priority: p.id as any })}
                        className={`p-4 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-2 h-28 ${
                          selected
                            ? 'bg-sky-500/20 border-sky-400 text-white ring-2 ring-sky-400/40'
                            : 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <Icon className={`w-6 h-6 ${selected ? 'text-sky-300' : 'text-slate-400'}`} />
                        <span className="font-bold text-xs">{p.title}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-8 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-4 py-2 text-slate-400 hover:text-white text-xs font-semibold"
                  >
                    → السابق
                  </button>
                  <button
                    type="button"
                    onClick={calculateRecommendations}
                    className="px-8 py-3 bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 text-slate-950 font-extrabold rounded-xl text-sm transition-all shadow-lg shadow-sky-500/20"
                  >
                    استخراج النتائج والترشيحات ✨
                  </button>
                </div>
              </div>
            )}

          </div>
        ) : (
          /* Results View */
          <div className="relative z-10 space-y-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="font-extrabold text-lg text-white">
                  أفضل الأجهزة المتطابقة مع معاييرك
                </h3>
                <p className="text-xs text-slate-400">
                  تم الترتيب بناءً على مطابقة الفئة والميزانية والاستخدام ومواصفات العتاد.
                </p>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-sky-300 font-semibold transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                تعديل الإجابات
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {recommendations.map((rec, idx) => (
                <div
                  key={rec.product.id}
                  className="bg-white/10 border border-white/15 rounded-2xl p-5 flex flex-col justify-between backdrop-blur-md relative"
                >
                  {idx === 0 && (
                    <span className="absolute -top-3 right-4 px-3 py-0.5 rounded-full bg-sky-400 text-slate-950 text-[10px] font-extrabold shadow-md">
                      أعلى توافق: {rec.matchScore}%
                    </span>
                  )}

                  <div>
                    <div className="relative h-40 w-full rounded-xl overflow-hidden bg-white/5 mb-3">
                      <Image
                        src={rec.product.images[0]}
                        alt={rec.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex items-baseline justify-between mb-1">
                      <span className="text-xs text-sky-300 font-medium">{rec.product.brand}</span>
                      <span className="text-base font-extrabold text-white">
                        {rec.product.price.toLocaleString('ar-SA')} ر.س
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-white mb-2 line-clamp-1">
                      {rec.product.name}
                    </h4>

                    {/* Explanation */}
                    <div className="p-3 rounded-xl bg-slate-900/60 border border-white/10 text-xs text-slate-300 leading-relaxed mb-4">
                      <span className="text-sky-300 font-bold block mb-1">لماذا يناسبك؟</span>
                      {rec.reason}
                    </div>
                  </div>

                  <Link
                    href={`/products/${rec.product.id}`}
                    className="w-full py-2.5 bg-white text-slate-950 hover:bg-sky-300 font-bold text-xs rounded-xl text-center transition-colors block"
                  >
                    استعراض المواصفات والشراء ←
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
