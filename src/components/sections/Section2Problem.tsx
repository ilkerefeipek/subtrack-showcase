import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import CountUp from '../ui/CountUp';
import StatCard from '../ui/StatCard';
import { gsap, ScrollTrigger } from '@/lib/gsap-setup';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const STATS: Array<{
  value: React.ReactNode;
  label: string;
  accent: 'indigo' | 'mint' | 'magenta';
}> = [
  {
    value: <CountUp end={22800} duration={2} prefix="₺" format={(n) => Math.round(n).toLocaleString('tr-TR')} />,
    label: 'Yıllık ortalama abonelik harcaması (Türkiye)',
    accent: 'indigo',
  },
  {
    value: <CountUp end={42} duration={1.6} prefix="%" />,
    label: 'Kullanıcı en az bir aboneliğini unutuyor',
    accent: 'mint',
  },
  {
    value: (
      <>
        <CountUp end={143} duration={1.6} />
        <span className="text-ink-muted">/1189</span>
      </>
    ),
    label: 'Servis iptali bilerek zorlaştırıyor',
    accent: 'magenta',
  },
];

export default function Section2Problem() {
  const sectionRef = useRef<HTMLElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const headlineInView = useInView(headlineRef, { once: true, margin: '-15% 0px' });

  useEffect(() => {
    const num = numberRef.current;
    if (!num) return;
    if (reduced) {
      num.textContent = '89';
      return;
    }
    const proxy = { value: 0 };
    const trigger = ScrollTrigger.create({
      trigger: num,
      start: 'top 75%',
      once: true,
      onEnter: () => {
        gsap.to(proxy, {
          value: 89,
          duration: 2.4,
          ease: 'power3.out',
          snap: { value: 1 },
          onUpdate: () => {
            num.textContent = String(proxy.value);
          },
        });
      },
    });
    return () => trigger.kill();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      id="problem"
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-bg-base px-5 py-24 md:py-36"
    >
      {/* Decorative grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(ellipse 60% 60% at center, black 30%, transparent 80%)',
        }}
      />

      {/* Floating orb */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
        style={{ background: 'radial-gradient(circle, #7B61FF 0%, transparent 70%)' }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        {/* Mobile: centered stack. Desktop (lg+): split — 89% left, stats right */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          {/* Left column — headline + 89% */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <p className="text-[10px] uppercase tracking-[0.4em] text-ink-secondary">
              Veriler · 2026
            </p>

            <div className="relative mt-6 lg:mt-8">
              <span
                className="font-display font-bold leading-[0.85] tracking-[-0.05em] text-neon-indigo text-glow-indigo"
                style={{
                  fontSize: 'clamp(7rem, 22vw, 22rem)',
                  letterSpacing: '-0.08em',
                }}
              >
                <span ref={numberRef}>0</span>
                <span className="text-white/40">%</span>
              </span>
            </div>

            <motion.h2
              ref={headlineRef}
              initial={{ opacity: 0, y: 20 }}
              animate={headlineInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="mt-8 font-display font-semibold leading-tight tracking-tight text-white"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 3.5rem)' }}
            >
              Aboneliklerimiz <span className="text-neon-magenta">kontrolden</span> çıkıyor.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={headlineInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
              className="mt-4 max-w-md text-[14px] leading-relaxed text-ink-secondary md:text-[16px] lg:text-[18px]"
            >
              Kullanıcı, toplam abonelik harcamasını gerçek tutarın yarısından az tahmin ediyor.
            </motion.p>

            <p className="mt-8 text-[10px] uppercase tracking-[0.3em] text-ink-muted">
              Self Financial 2026 · Kepyo 2026 · JustCancel 2026
            </p>
          </div>

          {/* Right column — stat cards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={headlineInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1 lg:gap-5"
          >
            {STATS.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={headlineInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.45 + i * 0.12, ease: 'easeOut' }}
                className="transition-transform duration-300 hover:scale-[1.02]"
              >
                <StatCard value={s.value} label={s.label} accent={s.accent} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
