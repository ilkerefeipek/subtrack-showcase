import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap-setup';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface Props {
  onDone: () => void;
}

export default function Section0Loader({ onDone }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const checkRef = useRef<SVGPathElement>(null);
  const wordmarkRef = useRef<HTMLSpanElement>(null);
  const barFillRef = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const root = rootRef.current;
    const check = checkRef.current;
    const wordmark = wordmarkRef.current;
    const barFill = barFillRef.current;
    if (!root || !check || !wordmark || !barFill) return;

    if (reduced) {
      const t = setTimeout(() => onDoneRef.current(), 300);
      return () => clearTimeout(t);
    }

    const len = check.getTotalLength();
    gsap.set(check, { strokeDasharray: len, strokeDashoffset: len, opacity: 1 });
    gsap.set(wordmark, { opacity: 0, y: 8 });
    gsap.set(barFill, { width: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(root, {
          y: '-100%',
          duration: 0.9,
          ease: 'expo.inOut',
          onComplete: () => onDoneRef.current(),
        });
      },
    });

    tl.to(check, { strokeDashoffset: 0, duration: 0.8, ease: 'power2.inOut' })
      .to(wordmark, { opacity: 1, y: 0, duration: 0.55, ease: 'expo.out' }, '-=0.2')
      .to(barFill, { width: '100%', duration: 1.0, ease: 'power2.inOut' }, '-=0.4')
      .to({}, { duration: 0.15 });

    return () => {
      tl.kill();
    };
  }, [reduced]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg-base bg-noise"
      aria-hidden="true"
    >
      <svg width="80" height="80" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r="36" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        <path
          ref={checkRef}
          d="M22 41 L35 54 L58 28"
          stroke="#00F5C4"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{ filter: 'drop-shadow(0 0 16px rgba(0,245,196,0.6))', opacity: 0 }}
        />
      </svg>
      <span
        ref={wordmarkRef}
        className="mt-4 font-display text-[28px] font-semibold tracking-tight text-white"
      >
        SubTrack
      </span>
      <div className="mt-8 h-px w-44 overflow-hidden rounded-full bg-white/5">
        <span
          ref={barFillRef}
          className="block h-full rounded-full bg-gradient-to-r from-neon-indigo via-neon-mint to-neon-indigo"
          style={{ boxShadow: '0 0 12px rgba(123,97,255,0.6)' }}
        />
      </div>
    </div>
  );
}
