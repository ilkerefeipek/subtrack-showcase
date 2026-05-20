interface Props {
  size?: number;
  className?: string;
}

// HBO Max wordmark (stylized).
export default function HBOMaxLogo({ size = 40, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      className={className}
      aria-label="HBO Max"
    >
      <defs>
        <linearGradient id="hbo-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0019F4" />
          <stop offset="100%" stopColor="#A100F0" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="8" fill="url(#hbo-g)" />
      <text
        x="20"
        y="25"
        textAnchor="middle"
        fontFamily="system-ui, sans-serif"
        fontWeight="900"
        fontSize="15"
        fill="#FFFFFF"
        letterSpacing="-0.5"
      >
        Max
      </text>
    </svg>
  );
}
