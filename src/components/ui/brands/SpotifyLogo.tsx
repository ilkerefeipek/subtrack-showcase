interface Props {
  size?: number;
  className?: string;
}

// Spotify mark: green circle with 3 sound waves.
export default function SpotifyLogo({ size = 40, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      className={className}
      aria-label="Spotify"
    >
      <circle cx="20" cy="20" r="18" fill="#1ED760" />
      <path
        d="M10.5 16.5c5-1.5 12.5-1 18 2"
        stroke="#0B0B0E"
        strokeWidth="2.6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M12 21c4-1 10-0.7 14.5 1.8"
        stroke="#0B0B0E"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M13.5 25c3-0.8 8-0.5 11.5 1.4"
        stroke="#0B0B0E"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
