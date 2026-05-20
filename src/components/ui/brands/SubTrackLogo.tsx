interface Props {
  size?: number;
  showWordmark?: boolean;
  className?: string;
  checkClassName?: string;
}

export default function SubTrackLogo({
  size = 32,
  showWordmark = true,
  className,
  checkClassName,
}: Props) {
  if (!showWordmark) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        className={className}
        aria-label="SubTrack"
      >
        <rect width="32" height="32" rx="8" fill="#08080F" />
        <path
          d="M9 16.5 L14 21.5 L23 11"
          stroke="#00F5C4"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          className={checkClassName}
        />
      </svg>
    );
  }

  return (
    <div className={`flex items-center gap-2.5 ${className ?? ''}`}>
      <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill="#12121F" />
        <path
          d="M9 16.5 L14 21.5 L23 11"
          stroke="#00F5C4"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          className={checkClassName}
        />
      </svg>
      <span
        className="font-display font-semibold tracking-tight text-ink-primary"
        style={{ fontSize: size * 0.82 }}
      >
        SubTrack
      </span>
    </div>
  );
}
