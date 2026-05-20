import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import FloatingScene from '../three/FloatingScene';
import NetflixLogo from '../ui/brands/NetflixLogo';
import SpotifyLogo from '../ui/brands/SpotifyLogo';
import HBOMaxLogo from '../ui/brands/HBOMaxLogo';
import AdobeCCLogo from '../ui/brands/AdobeCCLogo';
import { useReducedMotion } from '@/hooks/useReducedMotion';

type Brand = 'netflix' | 'spotify' | 'hbo' | 'adobe';

interface CardConfig {
  brand: Brand;
  name: string;
  price: string;
  basePos: { x: number; y: number }; // viewport %
  rot: number;
  warn?: { text: string; tone: 'red' | 'amber' };
}

interface ResponsivePos {
  mobile: { x: number; y: number };
  desktop: { x: number; y: number };
}

const CARDS: Array<CardConfig & { rPos: ResponsivePos }> = [
  {
    brand: 'netflix',
    name: 'Netflix',
    price: '₺149',
    basePos: { x: 24, y: 22 },
    rPos: { mobile: { x: 24, y: 22 }, desktop: { x: 16, y: 24 } },
    rot: -8,
  },
  {
    brand: 'spotify',
    name: 'Spotify',
    price: '₺79',
    basePos: { x: 74, y: 20 },
    rPos: { mobile: { x: 74, y: 20 }, desktop: { x: 84, y: 22 } },
    rot: 6,
    warn: { text: '23 gün', tone: 'amber' },
  },
  {
    brand: 'hbo',
    name: 'HBO Max',
    price: '₺189',
    basePos: { x: 26, y: 78 },
    rPos: { mobile: { x: 26, y: 78 }, desktop: { x: 18, y: 76 } },
    rot: 5,
  },
  {
    brand: 'adobe',
    name: 'Adobe CC',
    price: '₺430',
    basePos: { x: 76, y: 80 },
    rPos: { mobile: { x: 76, y: 80 }, desktop: { x: 82, y: 78 } },
    rot: -7,
    warn: { text: '47 gün', tone: 'red' },
  },
];

function BrandIcon({ brand }: { brand: Brand }) {
  switch (brand) {
    case 'netflix':
      return <NetflixLogo size={56} />;
    case 'spotify':
      return <SpotifyLogo size={56} />;
    case 'hbo':
      return <HBOMaxLogo size={56} />;
    case 'adobe':
      return <AdobeCCLogo size={56} />;
  }
}

interface CardProps {
  cfg: CardConfig & { rPos: ResponsivePos };
  index: number;
  pointer: { x: ReturnType<typeof useMotionValue<number>>; y: ReturnType<typeof useMotionValue<number>> };
  active: ReturnType<typeof useMotionValue<number>>;
  reduced: boolean;
  isDesktop: boolean;
}

function FloatingCard({ cfg, index, pointer, active, reduced, isDesktop }: CardProps) {
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);
  const springX = useSpring(offsetX, { damping: 18, stiffness: 110, mass: 0.7 });
  const springY = useSpring(offsetY, { damping: 18, stiffness: 110, mass: 0.7 });
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    let raf: number;
    const tick = () => {
      const el = cardRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const px = pointer.x.get();
        const py = pointer.y.get();
        const dx = cx - px;
        const dy = cy - py;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 220;
        const isActive = active.get() === 1 && dist < radius;
        if (isActive) {
          const force = (1 - dist / radius) * 90;
          const nx = dx / dist;
          const ny = dy / dist;
          offsetX.set(nx * force);
          offsetY.set(ny * force);
        } else {
          // sine wave float
          const t = performance.now() / 1000;
          const fx = Math.sin(t * 0.6 + index) * 8;
          const fy = Math.cos(t * 0.4 + index * 1.5) * 10;
          offsetX.set(fx);
          offsetY.set(fy);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [pointer, active, offsetX, offsetY, index, reduced]);

  const pos = isDesktop ? cfg.rPos.desktop : cfg.rPos.mobile;
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.8, y: 32 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-15% 0px' }}
      transition={{ duration: 0.8, delay: 0.15 + index * 0.12, ease: 'easeOut' }}
      className="absolute"
      style={{
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        transform: 'translate(-50%, -50%)',
        x: springX,
        y: springY,
      }}
    >
      <motion.div
        style={{ rotate: cfg.rot }}
        className="group relative w-[140px] rounded-2xl border border-white/10 bg-bg-elevated/85 p-4 shadow-glow-indigo backdrop-blur-md transition-transform duration-300 sm:w-[176px] sm:p-5 lg:w-[200px] lg:p-6 lg:hover:scale-105"
      >
        <div className="flex flex-col items-center gap-2.5">
          <BrandIcon brand={cfg.brand} />
          <p className="text-[12px] font-medium text-white">{cfg.name}</p>
        </div>
        {/* Price sticker */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-neon-mint/40 bg-bg-base px-3 py-1 font-mono text-[12px] font-semibold text-neon-mint shadow-glow-mint">
          {cfg.price}
        </div>
        {/* Warning badge */}
        {cfg.warn && (
          <div
            className={`absolute -right-2 -top-2 flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${
              cfg.warn.tone === 'red'
                ? 'border-neon-magenta/50 bg-neon-magenta/10 text-neon-magenta'
                : 'border-amber-400/50 bg-amber-400/10 text-amber-300'
            }`}
          >
            <span className="h-1 w-1 rounded-full bg-current" />
            {cfg.warn.text}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function Section3Floating() {
  const sectionRef = useRef<HTMLElement>(null);
  const pointerX = useMotionValue(-1000);
  const pointerY = useMotionValue(-1000);
  const active = useMotionValue(0);
  const reduced = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1024px)');
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    setIsDesktop(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    if (!section) return;

    const onPointerMove = (e: PointerEvent) => {
      pointerX.set(e.clientX);
      pointerY.set(e.clientY);
      active.set(1);
    };
    const onPointerLeave = () => {
      active.set(0);
    };
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      pointerX.set(t.clientX);
      pointerY.set(t.clientY);
      active.set(1);
    };
    const onTouchEnd = () => {
      setTimeout(() => active.set(0), 600);
    };

    section.addEventListener('pointermove', onPointerMove, { passive: true });
    section.addEventListener('pointerleave', onPointerLeave);
    section.addEventListener('touchmove', onTouchMove, { passive: true });
    section.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      section.removeEventListener('pointermove', onPointerMove);
      section.removeEventListener('pointerleave', onPointerLeave);
      section.removeEventListener('touchmove', onTouchMove);
      section.removeEventListener('touchend', onTouchEnd);
    };
  }, [pointerX, pointerY, active, reduced]);

  return (
    <section
      ref={sectionRef}
      id="floating"
      className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-bg-base"
    >
      <FloatingScene reducedMotion={reduced} starCount={reduced ? 0 : isDesktop ? 1000 : 600} />

      {/* Cards */}
      <div className="absolute inset-0 z-[2]">
        {CARDS.map((cfg, i) => (
          <FloatingCard
            key={cfg.brand}
            cfg={cfg}
            index={i}
            pointer={{ x: pointerX, y: pointerY }}
            active={active}
            reduced={reduced}
            isDesktop={isDesktop}
          />
        ))}
      </div>

      {/* Center cost */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-20% 0px' }}
        transition={{ duration: 0.9, ease: 'easeOut', delay: 0.5 }}
        className="relative z-[3] flex flex-col items-center text-center"
      >
        <p className="mb-2 text-[10px] uppercase tracking-[0.4em] text-ink-secondary">
          Aylık toplam
        </p>
        <motion.div
          animate={
            reduced
              ? {}
              : {
                  textShadow: [
                    '0 0 24px rgba(0,245,196,0.5), 0 0 60px rgba(0,245,196,0.3)',
                    '0 0 32px rgba(0,245,196,0.8), 0 0 80px rgba(0,245,196,0.5)',
                    '0 0 24px rgba(0,245,196,0.5), 0 0 60px rgba(0,245,196,0.3)',
                  ],
                }
          }
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          className="font-display font-bold leading-none tracking-tight text-neon-mint"
          style={{ fontSize: 'clamp(3rem, 14vw, 9rem)' }}
        >
          ₺ 847<span className="text-neon-mint/70">,50</span>
        </motion.div>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.3em] text-ink-secondary">
          / ay
        </p>
        <p className="mt-6 max-w-xs text-[12px] text-ink-muted">
          {CARDS.length} servis · 2 tanesi uzun süredir kullanılmıyor
        </p>
      </motion.div>

      {/* Bottom hint */}
      <p className="absolute bottom-6 left-1/2 z-[3] -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-ink-muted">
        ↻ dokun, dağılsınlar
      </p>
    </section>
  );
}
