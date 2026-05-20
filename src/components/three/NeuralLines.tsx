import { useEffect, useRef } from 'react';

interface Props {
  className?: string;
  reduced?: boolean;
}

function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

interface Node {
  x: number;
  y: number;
}

export default function NeuralLines({ className, reduced }: Props) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (reduced) return;
    const svg = ref.current;
    if (!svg) return;
    const lines = svg.querySelectorAll<SVGLineElement>('line[data-neural]');
    lines.forEach((line, i) => {
      const len = 200;
      line.style.strokeDasharray = `${len}`;
      line.style.strokeDashoffset = `${len}`;
      line.style.transition = 'none';
      requestAnimationFrame(() => {
        line.style.transition = `stroke-dashoffset 1.8s ${i * 0.18}s ease-out`;
        line.style.strokeDashoffset = '0';
      });
    });
  }, [reduced]);

  const r = rng(7);
  const nodes: Node[] = Array.from({ length: 8 }, () => ({
    x: r() * 100,
    y: r() * 100,
  }));

  return (
    <svg
      ref={ref}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={`pointer-events-none ${className ?? ''}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="nl-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7B61FF" stopOpacity="0.7" />
          <stop offset="1" stopColor="#00F5C4" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      {nodes.map((from, i) =>
        nodes
          .slice(i + 1)
          .map((to, j) => (
            <line
              key={`${i}-${j}`}
              data-neural
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="url(#nl-grad)"
              strokeWidth="0.18"
              opacity={0.5}
            />
          )),
      )}
      {nodes.map((n, i) => (
        <circle key={`n-${i}`} cx={n.x} cy={n.y} r="0.7" fill="#00F5C4">
          <animate
            attributeName="r"
            values="0.5;1.4;0.5"
            dur={`${2 + (i % 3)}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </svg>
  );
}
