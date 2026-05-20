interface Props {
  size?: number;
  className?: string;
}

// Stylized Netflix "N" mark.
export default function NetflixLogo({ size = 40, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      className={className}
      aria-label="Netflix"
    >
      <defs>
        <linearGradient id="nflx-g" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#E50914" />
          <stop offset="100%" stopColor="#B20710" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="8" fill="#0B0B0E" />
      <path d="M13 8 H18 L27 32 H22 Z" fill="url(#nflx-g)" />
      <rect x="13" y="8" width="5" height="24" fill="#E50914" />
      <rect x="22" y="8" width="5" height="24" fill="#E50914" />
    </svg>
  );
}
