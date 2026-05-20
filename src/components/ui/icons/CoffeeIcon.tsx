interface Props {
  size?: number;
  className?: string;
  glow?: boolean;
}

// Takeaway coffee cup: trapezoid body, lid, sleeve band, steam wisps.
export default function CoffeeIcon({ size = 32, className, glow = true }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
      style={{ filter: glow ? 'drop-shadow(0 0 8px rgba(0, 245, 196, 0.65))' : undefined }}
    >
      {/* Steam wisps */}
      <path
        d="M12 3 Q13 5 12 7 Q11 9 12 11"
        stroke="#00F5C4"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.6"
        fill="none"
      />
      <path
        d="M16 3 Q17 5 16 7 Q15 9 16 11"
        stroke="#00F5C4"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.8"
        fill="none"
      />
      <path
        d="M20 3 Q21 5 20 7 Q19 9 20 11"
        stroke="#00F5C4"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.6"
        fill="none"
      />
      {/* Lid */}
      <path
        d="M7 12 L25 12 L24 14 L8 14 Z"
        fill="rgba(0, 245, 196, 0.08)"
        stroke="#00F5C4"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Sip hole */}
      <ellipse cx="12" cy="13" rx="1.5" ry="0.6" fill="#00F5C4" opacity="0.7" />
      {/* Cup body (trapezoid: wide top, narrow bottom) */}
      <path
        d="M8 14 L24 14 L21.5 30 L10.5 30 Z"
        fill="rgba(0, 245, 196, 0.06)"
        stroke="#00F5C4"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Sleeve band */}
      <path
        d="M9 20 L23 20 L22.5 23 L9.5 23 Z"
        fill="rgba(0, 245, 196, 0.12)"
        stroke="#00F5C4"
        strokeWidth="1.2"
      />
    </svg>
  );
}
