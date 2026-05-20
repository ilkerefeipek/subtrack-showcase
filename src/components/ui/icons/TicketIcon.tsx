interface Props {
  size?: number;
  className?: string;
  glow?: boolean;
}

// Cinema ticket: horizontal 2:1 rect, perforation dots on left, barcode hint on right.
export default function TicketIcon({ size = 32, className, glow = true }: Props) {
  const w = size;
  const h = size / 2;
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 64 32"
      fill="none"
      aria-hidden="true"
      className={className}
      style={{ filter: glow ? 'drop-shadow(0 0 8px rgba(123, 97, 255, 0.65))' : undefined }}
    >
      <rect
        x="2"
        y="2"
        width="60"
        height="28"
        rx="3"
        fill="rgba(123, 97, 255, 0.06)"
        stroke="#7B61FF"
        strokeWidth="1.5"
      />
      {/* Perforation column */}
      <line x1="14" y1="4" x2="14" y2="28" stroke="#7B61FF" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.7" />
      {/* Tiny circular notches simulating perf */}
      <circle cx="14" cy="2" r="1.2" fill="#08080F" stroke="#7B61FF" strokeWidth="0.6" />
      <circle cx="14" cy="30" r="1.2" fill="#08080F" stroke="#7B61FF" strokeWidth="0.6" />
      {/* Star / play hint */}
      <circle cx="7" cy="16" r="2" fill="none" stroke="#7B61FF" strokeWidth="1" />
      <path d="M6 14.5 L9 16 L6 17.5 Z" fill="#7B61FF" />
      {/* Barcode hint — vertical lines on right */}
      <g stroke="#7B61FF" strokeWidth="1" opacity="0.85">
        <line x1="22" y1="9" x2="22" y2="23" />
        <line x1="26" y1="9" x2="26" y2="23" />
        <line x1="29" y1="9" x2="29" y2="23" strokeWidth="0.6" />
        <line x1="33" y1="9" x2="33" y2="23" />
        <line x1="36" y1="9" x2="36" y2="23" strokeWidth="0.6" />
        <line x1="40" y1="9" x2="40" y2="23" />
        <line x1="43" y1="9" x2="43" y2="23" strokeWidth="0.6" />
        <line x1="47" y1="9" x2="47" y2="23" />
        <line x1="51" y1="9" x2="51" y2="23" strokeWidth="0.6" />
        <line x1="55" y1="9" x2="55" y2="23" />
      </g>
    </svg>
  );
}
