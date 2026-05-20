import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import PhoneMockup, { type PhoneVariant } from '../ui/PhoneMockup';
import NeuralLines from '../three/NeuralLines';
import { ScrollTrigger } from '@/lib/gsap-setup';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface StepConfig {
  index: number;
  badge: string;
  title: string;
  body: string;
  variant: PhoneVariant;
  accent: 'indigo' | 'mint' | 'magenta';
}

const STEPS: StepConfig[] = [
  {
    index: 1,
    badge: 'Adım 01',
    title: 'Otomatik Tespit',
    body: 'Banka API entegrasyonu ile tüm tekrarlayan ödemeler tek tıkla.',
    variant: 'detected',
    accent: 'indigo',
  },
  {
    index: 2,
    badge: 'Adım 02',
    title: 'AI Önerileri',
    body: 'Kullanım desenlerini analiz eder; gereksiz aboneliği tespit eder.',
    variant: 'ai-suggestion',
    accent: 'mint',
  },
  {
    index: 3,
    badge: 'Adım 03',
    title: 'Tek Tıkla İptal',
    body: 'Karanlık tasarımları bypass eden iptal otomasyonu.',
    variant: 'cancel',
    accent: 'magenta',
  },
];

const accentRing = {
  indigo: 'border-neon-indigo/40 shadow-glow-indigo',
  mint: 'border-neon-mint/40 shadow-glow-mint',
  magenta: 'border-neon-magenta/40 shadow-glow-magenta',
};

const accentText = {
  indigo: 'text-neon-indigo',
  mint: 'text-neon-mint',
  magenta: 'text-neon-magenta',
};

export default function Section4Solution() {
  const sectionRef = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (reduced) {
      setStep(0);
      return;
    }
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      scrub: false,
      onUpdate: (self) => {
        const p = self.progress;
        const idx = Math.min(STEPS.length - 1, Math.floor(p * STEPS.length));
        setStep(idx);
      },
    });
    return () => {
      trigger.kill();
    };
  }, [reduced]);

  const current = STEPS[step];

  return (
    <section
      ref={sectionRef}
      id="solution"
      className="relative w-full bg-bg-base"
      style={{ height: `${STEPS.length * 100}vh` }}
    >
      {/* Sticky stage */}
      <div className="sticky top-0 flex h-[100dvh] w-full items-center overflow-hidden bg-bg-base">
        {/* Background neural net for step 2 */}
        <AnimatePresence>
          {step === 1 && (
            <motion.div
              key="neural"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 z-[1]"
            >
              <NeuralLines className="h-full w-full" reduced={reduced} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Decorative grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse 70% 60% at center, black 30%, transparent 80%)',
          }}
        />

        {/* Vignette */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 30%, rgba(8,8,15,0.6) 80%)',
          }}
        />

        <div className="relative z-[2] mx-auto flex w-full max-w-7xl flex-col items-center gap-8 px-5 md:flex-row md:justify-between md:gap-12 md:px-12 lg:gap-20">
          {/* Text column */}
          <div className="order-2 max-w-md md:order-1 md:max-w-sm md:flex-1 lg:max-w-lg">
            {/* Step pills */}
            <div className="mb-5 flex items-center gap-2">
              {STEPS.map((s, i) => (
                <span
                  key={s.index}
                  className={`h-1 transition-all duration-500 ${
                    i === step
                      ? `${accentText[current.accent].replace('text', 'bg')} w-10`
                      : 'w-5 bg-white/15'
                  }`}
                  style={{
                    background:
                      i === step
                        ? current.accent === 'indigo'
                          ? '#7B61FF'
                          : current.accent === 'mint'
                            ? '#00F5C4'
                            : '#FF2D9D'
                        : undefined,
                    boxShadow:
                      i === step
                        ? `0 0 12px ${
                            current.accent === 'indigo'
                              ? 'rgba(123,97,255,0.6)'
                              : current.accent === 'mint'
                                ? 'rgba(0,245,196,0.6)'
                                : 'rgba(255,45,157,0.6)'
                          }`
                        : undefined,
                  }}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <p
                  className={`text-[10px] uppercase tracking-[0.4em] ${accentText[current.accent]}`}
                >
                  {current.badge}
                </p>
                <h2 className="mt-3 font-display font-semibold leading-[0.95] tracking-tight text-white" style={{ fontSize: 'clamp(2.25rem, 5.5vw, 5rem)' }}>
                  {current.title}
                </h2>
                <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-ink-secondary md:text-[16px] lg:max-w-md lg:text-[18px]">
                  {current.body}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Phone column */}
          <div className="order-1 flex flex-1 items-center justify-center md:order-2">
            <div
              className={`relative rounded-[52px] border ${accentRing[current.accent]} transition-shadow duration-500`}
              style={{
                padding: 0,
                boxShadow:
                  current.accent === 'indigo'
                    ? '0 0 60px rgba(123,97,255,0.3)'
                    : current.accent === 'mint'
                      ? '0 0 60px rgba(0,245,196,0.3)'
                      : '0 0 60px rgba(255,45,157,0.3)',
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${current.variant}-lg`}
                  initial={{ opacity: 0, scale: 0.96, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -12 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="hidden lg:block"
                >
                  <PhoneMockup variant={current.variant} scale={0.92} />
                </motion.div>
              </AnimatePresence>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${current.variant}-md`}
                  initial={{ opacity: 0, scale: 0.96, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -12 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="hidden sm:block lg:hidden"
                >
                  <PhoneMockup variant={current.variant} scale={0.72} />
                </motion.div>
              </AnimatePresence>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${current.variant}-mob`}
                  initial={{ opacity: 0, scale: 0.96, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -12 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="block sm:hidden"
                >
                  <PhoneMockup variant={current.variant} scale={0.52} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="absolute right-5 top-1/2 z-[3] -translate-y-1/2 md:right-8">
          <div className="flex flex-col items-center gap-3">
            <span className="font-mono text-[10px] text-ink-muted">
              {String(step + 1).padStart(2, '0')} / {String(STEPS.length).padStart(2, '0')}
            </span>
            <div className="h-32 w-px bg-white/10">
              <div
                className="block w-full transition-all duration-500"
                style={{
                  height: `${((step + 1) / STEPS.length) * 100}%`,
                  background:
                    current.accent === 'indigo'
                      ? '#7B61FF'
                      : current.accent === 'mint'
                        ? '#00F5C4'
                        : '#FF2D9D',
                  boxShadow: `0 0 8px currentColor`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
