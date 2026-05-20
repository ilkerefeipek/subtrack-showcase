import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from '@/lib/gsap-setup';
import TicketIcon from '../ui/icons/TicketIcon';
import CoffeeIcon from '../ui/icons/CoffeeIcon';
import CountUp from '../ui/CountUp';

const YEARLY_SAVINGS = 9348;
const TICKET_COST = 200;
const COFFEE_COST = 150;
const TICKETS = Math.floor(YEARLY_SAVINGS / TICKET_COST); // 46
const COFFEES = Math.floor(YEARLY_SAVINGS / COFFEE_COST); // 62

interface BasketCardProps {
  title: string;
  count: number;
  unit: string;
  accent: 'indigo' | 'mint';
  Icon: typeof TicketIcon;
  active: boolean;
  delay: number;
  reduced: boolean;
}

function BasketCard({ title, count, unit, accent, Icon, active, delay, reduced }: BasketCardProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const accentText = accent === 'indigo' ? 'text-neon-indigo' : 'text-neon-mint';
  const accentBorder = accent === 'indigo' ? 'border-neon-indigo/30' : 'border-neon-mint/30';
  const accentGlow =
    accent === 'indigo'
      ? '0 0 60px -20px rgba(123, 97, 255, 0.55)'
      : '0 0 60px -20px rgba(0, 245, 196, 0.55)';

  useEffect(() => {
    if (!active || reduced) return;
    const grid = gridRef.current;
    if (!grid) return;
    const items = grid.querySelectorAll<HTMLElement>('[data-grid-item]');
    gsap.fromTo(
      items,
      { opacity: 0, scale: 0.4, y: 8 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.45,
        ease: 'back.out(2)',
        stagger: accent === 'indigo' ? 0.028 : 0.022,
        delay: delay + 0.6,
      },
    );
  }, [active, reduced, accent, delay]);

  // 46 → 8x6 mobile (48 slots), 10x5 desktop (50 slots).
  // 62 → 8x8 mobile (64 slots), 10x7 desktop (70 slots).
  const isTickets = accent === 'indigo';
  const mobileCols = 8;
  const desktopCols = 10;
  const totalSlots = isTickets ? 48 : 64;
  const visibleCount = count;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut', delay }}
      className={`relative w-full overflow-hidden rounded-3xl border ${accentBorder} bg-bg-surface/60 p-5 backdrop-blur-md md:p-7`}
      style={{ boxShadow: active ? accentGlow : undefined }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.35em] text-ink-secondary">{title}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className={`font-display font-bold leading-none ${accentText}`}
              style={{ fontSize: 'clamp(3.5rem, 9vw, 6rem)' }}
            >
              ×{' '}
              <CountUp
                end={count}
                duration={1.4}
                format={(n) => Math.round(n).toString()}
              />
            </span>
          </div>
          <p className="mt-2 text-[13px] text-ink-secondary md:text-[14px]">{unit}</p>
        </div>
        <Icon size={44} />
      </div>

      {/* Grid */}
      <div
        ref={gridRef}
        className="mt-6 grid gap-1.5 md:gap-2"
        style={{
          gridTemplateColumns: `repeat(${mobileCols}, minmax(0, 1fr))`,
        }}
        data-cols-mobile={mobileCols}
        data-cols-desktop={desktopCols}
      >
        {Array.from({ length: totalSlots }).map((_, i) => {
          const isFilled = i < visibleCount;
          if (!isFilled) {
            return (
              <div
                key={i}
                aria-hidden
                className="aspect-square rounded-md border border-dashed border-white/[0.04]"
              />
            );
          }
          return (
            <div
              key={i}
              data-grid-item
              className="flex aspect-square items-center justify-center rounded-md"
              style={{ opacity: reduced ? 1 : 0 }}
            >
              <Icon size={accent === 'indigo' ? 26 : 24} />
            </div>
          );
        })}
      </div>

      {/* Cost line */}
      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-muted">
        {accent === 'indigo' ? '₺200 / bilet' : '₺150 / fincan'}
      </p>
    </motion.div>
  );
}

interface Props {
  reduced: boolean;
}

export default function SubsceneCalculator({ reduced }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState<0 | 1 | 2 | 3>(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) {
      setRevealed(3);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > 0.25) {
            // Stage progression with delays
            setRevealed(1);
            const t1 = setTimeout(() => setRevealed(2), 600);
            const t2 = setTimeout(() => setRevealed(3), 1200);
            observer.disconnect();
            // Cleanup via closure
            return () => {
              clearTimeout(t1);
              clearTimeout(t2);
            };
          }
        }
      },
      { threshold: [0, 0.25, 0.5] },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <div
      ref={ref}
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center px-5 py-20 md:py-28"
    >
      {/* Background tint */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            'radial-gradient(ellipse at 30% 40%, rgba(123,97,255,0.10) 0%, transparent 60%), radial-gradient(ellipse at 70% 60%, rgba(0,245,196,0.10) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={revealed >= 1 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center"
        >
          <p
            className="font-display font-medium text-neon-mint text-glow-mint"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}
          >
            ₺ 9.348 <span className="text-neon-mint/60">/ yıl</span>
          </p>
          <h3
            className="mt-3 font-display font-semibold tracking-tight text-white"
            style={{ fontSize: 'clamp(1.75rem, 5vw, 3.5rem)' }}
          >
            <SplitTextReveal active={revealed >= 1}>
              Bu para neye yeter?
            </SplitTextReveal>
          </h3>
        </motion.div>

        {/* Cards */}
        <div className="grid w-full gap-5 lg:grid-cols-2 lg:gap-6">
          <BasketCard
            title="Sinema"
            count={TICKETS}
            unit="sinema bileti"
            accent="indigo"
            Icon={TicketIcon}
            active={revealed >= 2}
            delay={0}
            reduced={reduced}
          />
          <BasketCard
            title="Kahve"
            count={COFFEES}
            unit="kahve fincanı"
            accent="mint"
            Icon={CoffeeIcon}
            active={revealed >= 3}
            delay={0.3}
            reduced={reduced}
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={revealed >= 3 ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-4 max-w-xl text-center text-[12px] uppercase tracking-[0.3em] text-ink-muted"
        >
          Sadece 2 aboneliği iptal et · yılda küçük bir ödül kazan
        </motion.p>
      </div>
    </div>
  );
}

function SplitTextReveal({ children, active }: { children: string; active: boolean }) {
  const words = children.split(' ');
  return (
    <>
      {words.map((w, i) => (
        <motion.span
          key={`${w}-${i}`}
          initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
          animate={active ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.55, delay: 0.15 + i * 0.08, ease: 'easeOut' }}
          className="mr-[0.25em] inline-block"
        >
          {w}
        </motion.span>
      ))}
    </>
  );
}
