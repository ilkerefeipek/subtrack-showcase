import { gsap } from './gsap-setup';

/**
 * Stagger reveal: opacity 0 -> 1, y 32 -> 0.
 */
export function staggerReveal(targets: gsap.TweenTarget, opts: { delay?: number; stagger?: number } = {}) {
  return gsap.fromTo(
    targets,
    { opacity: 0, y: 32 },
    {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'expo.out',
      stagger: opts.stagger ?? 0.08,
      delay: opts.delay ?? 0,
    },
  );
}

/**
 * Count-up from `start` to `end`. Reads `value` from a proxy object.
 */
export function countUp(
  proxy: { value: number },
  end: number,
  onUpdate: (v: number) => void,
  duration = 1.6,
): gsap.core.Tween {
  return gsap.to(proxy, {
    value: end,
    duration,
    ease: 'power3.out',
    snap: { value: 1 },
    onUpdate: () => onUpdate(proxy.value),
  });
}

/**
 * Pulse glow for hero badges / CTA buttons.
 */
export function pulseGlow(target: gsap.TweenTarget, color = 'rgba(0, 245, 196, 0.6)') {
  return gsap.to(target, {
    boxShadow: `0 0 60px ${color}`,
    repeat: -1,
    yoyo: true,
    duration: 1.4,
    ease: 'sine.inOut',
  });
}
