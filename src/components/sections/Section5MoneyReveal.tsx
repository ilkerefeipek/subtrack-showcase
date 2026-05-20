import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CountUp from '../ui/CountUp';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import SubsceneCalculator from './SubsceneCalculator';

interface Drop {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

function MintRain({ count = 26 }: { count?: number }) {
  const drops: Drop[] = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 6,
    duration: 6 + Math.random() * 6,
    size: 1 + Math.random() * 2.5,
  }));
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {drops.map((d) => (
        <span
          key={d.id}
          className="absolute top-[-10%] block rounded-full bg-neon-mint"
          style={{
            left: `${d.left}%`,
            width: `${d.size}px`,
            height: `${d.size}px`,
            opacity: 0.55,
            boxShadow: '0 0 8px rgba(0,245,196,0.7)',
            animation: `mint-fall ${d.duration}s ${d.delay}s linear infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes mint-fall {
          0% { transform: translateY(0) scale(0.4); opacity: 0; }
          10% { opacity: 0.7; }
          100% { transform: translateY(110vh) scale(1); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

interface SubsceneRevealProps {
  reduced: boolean;
}

function SubsceneMoneyReveal({ reduced }: SubsceneRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) {
      setStage(2);
      return;
    }
    let revealTimer: ReturnType<typeof setTimeout> | null = null;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > 0.25) {
            setStage((prev) => (prev < 1 ? 1 : prev));
            if (revealTimer) clearTimeout(revealTimer);
            revealTimer = setTimeout(() => setStage(2), 900);
          }
        }
      },
      { threshold: [0, 0.25, 0.5] },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (revealTimer) clearTimeout(revealTimer);
    };
  }, [reduced]);

  return (
    <div
      ref={ref}
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden px-5 py-24"
    >
      {/* Spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-3xl lg:h-[1000px] lg:w-[1000px]"
        style={{
          background: 'radial-gradient(circle, rgba(0,245,196,0.35) 0%, transparent 60%)',
        }}
      />

      {stage >= 2 && !reduced && <MintRain />}

      <div className="relative z-10 flex flex-col items-center text-center">
        <AnimatePresence>
          {stage >= 1 && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="font-display font-medium leading-snug text-ink-secondary"
              style={{ fontSize: 'clamp(1.25rem, 2.6vw, 2rem)' }}
            >
              Spotify ve Adobe CC iptal edilirse...
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {stage >= 2 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotateX: -30 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="mt-6 flex flex-col items-center md:mt-10"
              style={{ transformPerspective: 800 }}
            >
              <motion.span
                animate={
                  reduced
                    ? undefined
                    : {
                        textShadow: [
                          '0 0 30px rgba(0,245,196,0.5), 0 0 80px rgba(0,245,196,0.3)',
                          '0 0 40px rgba(0,245,196,0.9), 0 0 120px rgba(0,245,196,0.55)',
                          '0 0 30px rgba(0,245,196,0.5), 0 0 80px rgba(0,245,196,0.3)',
                        ],
                      }
                }
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="font-display font-bold leading-[0.85] tracking-tight text-neon-mint"
                style={{ fontSize: 'clamp(5rem, 18vw, 16rem)' }}
              >
                <span className="text-neon-mint/80">₺</span>{' '}
                <CountUp end={9348} duration={2.2} format={(n) => Math.round(n).toLocaleString('tr-TR')} />
              </motion.span>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="mt-4 font-display font-medium tracking-tight text-white"
                style={{ fontSize: 'clamp(1.25rem, 2.4vw, 2rem)' }}
              >
                yılda tasarruf.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 0.5 }}
                className="mt-8 text-[10px] uppercase tracking-[0.4em] text-ink-muted"
              >
                ↓ aşağıda: bu para neye yeter?
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function Section5MoneyReveal() {
  const reduced = useReducedMotion();
  return (
    <section id="money" className="relative w-full bg-bg-base">
      <SubsceneMoneyReveal reduced={reduced} />
      <SubsceneCalculator reduced={reduced} />
    </section>
  );
}
