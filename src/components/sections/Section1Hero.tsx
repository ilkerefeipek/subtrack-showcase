import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'framer-motion';
import ParticleField from '../three/ParticleField';
import PhoneMockup from '../ui/PhoneMockup';
import NeonButton from '../ui/NeonButton';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useDeviceOrientation } from '@/hooks/useDeviceOrientation';

const WORDMARK = 'SubTrack';

interface LetterProps {
  ch: string;
  index: number;
  pointer: { x: MotionValue<number>; y: MotionValue<number> };
  intensity: number;
}

function ParallaxLetter({ ch, index, pointer, intensity }: LetterProps) {
  const offset = (index - (WORDMARK.length - 1) / 2) * 0.45;
  const x = useTransform(pointer.x, (v) => v * (intensity * 18 + offset * 4));
  const y = useTransform(pointer.y, (v) => v * (intensity * 12));
  const rotate = useTransform(pointer.x, (v) => v * (intensity * 4));
  const xs = useSpring(x, { damping: 22, stiffness: 110, mass: 0.6 });
  const ys = useSpring(y, { damping: 22, stiffness: 110, mass: 0.6 });
  const rs = useSpring(rotate, { damping: 24, stiffness: 130, mass: 0.6 });

  return (
    <motion.span
      style={{ x: xs, y: ys, rotate: rs, display: 'inline-block', willChange: 'transform' }}
      className="text-glow-indigo"
    >
      {ch}
    </motion.span>
  );
}

function ScrollCue() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4, duration: 0.6 }}
      className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2"
    >
      <span className="text-[10px] uppercase tracking-[0.3em] text-ink-secondary">Kaydır</span>
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="relative h-[22px] w-[14px]"
      >
        <svg width="14" height="22" viewBox="0 0 14 22" className="absolute inset-0">
          <rect x="0.5" y="0.5" width="13" height="21" rx="6.5" fill="none" stroke="rgba(255,255,255,0.4)" />
        </svg>
        <motion.span
          aria-hidden
          className="absolute left-1/2 top-[4px] block h-[3.6px] w-[3.6px] -translate-x-1/2 rounded-full bg-neon-mint"
          animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ boxShadow: '0 0 6px rgba(0,245,196,0.9)' }}
        />
      </motion.div>
    </motion.div>
  );
}

function useViewportWidth() {
  const [w, setW] = useState<number>(() =>
    typeof window === 'undefined' ? 1024 : window.innerWidth,
  );
  useEffect(() => {
    const onResize = () => setW(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return w;
}

export default function Section1Hero() {
  const reduced = useReducedMotion();
  const { orientation, status, request } = useDeviceOrientation();
  const vw = useViewportWidth();
  const isDesktop = vw >= 1024;

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const sectionRef = useRef<HTMLElement>(null);

  // Cursor parallax
  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    if (!section) return;
    const onMove = (e: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      const cx = (e.clientX - rect.left) / rect.width - 0.5;
      const cy = (e.clientY - rect.top) / rect.height - 0.5;
      pointerX.set(cx);
      pointerY.set(cy);
    };
    section.addEventListener('pointermove', onMove, { passive: true });
    return () => section.removeEventListener('pointermove', onMove);
  }, [pointerX, pointerY, reduced]);

  // Gyroscope -> pointer values (when granted)
  useEffect(() => {
    if (status !== 'granted' || reduced) return;
    const gx = Math.max(-1, Math.min(1, orientation.gamma / 45));
    const gy = Math.max(-1, Math.min(1, (orientation.beta - 45) / 45));
    pointerX.set(gx * 0.5);
    pointerY.set(gy * 0.5);
  }, [orientation, status, reduced, pointerX, pointerY]);

  // Phone parallax transforms
  const phoneX = useTransform(pointerX, (v) => v * 16);
  const phoneY = useTransform(pointerY, (v) => v * 10);

  // Motion CTA gate
  const [showMotionCta, setShowMotionCta] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const hasOrient = 'DeviceOrientationEvent' in window;
    setShowMotionCta(isTouch && hasOrient && status === 'idle');
  }, [status]);

  const particleCount = reduced ? 0 : isDesktop ? 3500 : 2400;

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-bg-base"
    >
      <ParticleField count={particleCount} reducedMotion={reduced} />

      {/* Vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 30%, rgba(8,8,15,0.55) 80%, rgba(8,8,15,0.95) 100%)',
        }}
      />

      {/* Top brand bar */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="absolute left-0 right-0 top-0 z-30 flex items-center justify-between px-6 pt-5 md:px-12"
      >
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-ink-secondary">
          <span className="h-1.5 w-1.5 rounded-full bg-neon-mint shadow-glow-mint" />
          subtrack v1.0
        </div>
        <div className="hidden text-[10px] uppercase tracking-[0.3em] text-ink-secondary sm:block">
          tr · 2026
        </div>
      </motion.div>

      {/* Main grid: stacked on mobile, split on lg+ */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-4 pb-32 pt-16 md:px-12 md:pb-24 lg:grid-cols-[1.15fr_1fr] lg:gap-12 lg:pb-8 lg:pt-0 xl:gap-20">
        {/* Wordmark column */}
        <div className="flex flex-col items-center lg:items-start">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="whitespace-nowrap font-display font-bold leading-[0.85] tracking-[-0.045em] text-white"
            style={{ fontSize: 'clamp(2.8rem, 13vw, 14rem)' }}
          >
            {WORDMARK.split('').map((ch, i) => (
              <ParallaxLetter
                key={`${ch}-${i}`}
                ch={ch}
                index={i}
                pointer={{ x: pointerX, y: pointerY }}
                intensity={1}
              />
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-6 max-w-xs text-center text-[14px] leading-relaxed text-ink-secondary md:max-w-md md:text-[16px] lg:max-w-lg lg:text-left lg:text-[20px]"
          >
            Aboneliklerinizi yöneten{' '}
            <span className="text-white">yapay zekâ.</span>
          </motion.p>

          {showMotionCta && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="mt-6"
            >
              <NeonButton variant="mint" size="sm" onClick={request}>
                ⟁ Hareketle deneyimle
              </NeonButton>
            </motion.div>
          )}

          {/* Desktop-only stat strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="mt-10 hidden gap-8 lg:flex"
          >
            <div className="flex flex-col">
              <span className="font-mono text-[24px] font-medium text-white">₺22.8K</span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-ink-muted">yıllık</span>
            </div>
            <div className="h-12 w-px bg-border-subtle" />
            <div className="flex flex-col">
              <span className="font-mono text-[24px] font-medium text-neon-mint">4 servis</span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-ink-muted">örnek profil</span>
            </div>
            <div className="h-12 w-px bg-border-subtle" />
            <div className="flex flex-col">
              <span className="font-mono text-[24px] font-medium text-neon-indigo">%42</span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-ink-muted">unutuluyor</span>
            </div>
          </motion.div>
        </div>

        {/* Phone column */}
        <motion.div
          initial={{ opacity: 0, y: 80, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: isDesktop ? -4 : -8 }}
          transition={{ duration: 1.2, delay: 0.6, ease: 'easeOut' }}
          className="pointer-events-none relative flex justify-center lg:justify-end"
          style={{ x: phoneX, y: phoneY }}
        >
          {/* Mobile (default): peek in lower-right */}
          <div className="lg:hidden">
            <div className="absolute -right-12 -top-2 sm:right-0 sm:top-0">
              <PhoneMockup variant="home" scale={0.5} />
            </div>
            <div className="h-[220px] sm:h-[280px]" aria-hidden />
          </div>
          {/* Desktop: full phone, larger scale */}
          <div className="hidden lg:block">
            <PhoneMockup variant="home" scale={0.92} />
          </div>
        </motion.div>
      </div>

      {/* Subtle gradient floor */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-[2] h-48"
        style={{
          background: 'linear-gradient(to top, rgba(123,97,255,0.08), transparent)',
        }}
      />

      <ScrollCue />
    </section>
  );
}
