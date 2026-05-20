interface Props {
  size?: number;
  className?: string;
}

// Adobe Creative Cloud red square with the "A" mark.
export default function AdobeCCLogo({ size = 40, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      className={className}
      aria-label="Adobe Creative Cloud"
    >
      <rect width="40" height="40" rx="8" fill="#FA0F00" />
      <path
        d="M20 9 L29.5 31 H23.6 L21.4 25.4 H17 L20 18.2 L18.6 14.9 L13 31 H7.5 Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}
