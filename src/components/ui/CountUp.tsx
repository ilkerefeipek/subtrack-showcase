import { useEffect, useRef, useState } from 'react';
import { useInViewport } from '@/hooks/useInViewport';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { countUp } from '@/lib/animations';

interface Props {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  format?: (n: number) => string;
  className?: string;
  decimals?: number;
}

export default function CountUp({
  end,
  duration = 1.6,
  prefix,
  suffix,
  format,
  className,
  decimals = 0,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInViewport(ref, '-10% 0px');
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!inView || startedRef.current) return;
    startedRef.current = true;
    if (reduced) {
      setValue(end);
      return;
    }
    const proxy = { value: 0 };
    countUp(proxy, end, (v) => setValue(v), duration);
  }, [inView, end, duration, reduced]);

  const display = format ? format(value) : value.toFixed(decimals);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
