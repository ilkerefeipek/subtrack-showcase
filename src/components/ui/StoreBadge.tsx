import { type MouseEvent } from 'react';
import Tooltip from './Tooltip';

interface Props {
  store: 'apple' | 'google';
  onTry?: () => void;
}

function AppleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.05 12.04c-.03-2.4 1.95-3.55 2.04-3.61-1.11-1.62-2.83-1.85-3.45-1.87-1.46-.14-2.86.86-3.6.86-.76 0-1.9-.84-3.13-.81-1.6.02-3.09.93-3.92 2.36-1.67 2.9-.43 7.18 1.2 9.54.8 1.15 1.74 2.45 2.97 2.4 1.2-.05 1.65-.77 3.1-.77 1.43 0 1.85.77 3.12.74 1.28-.02 2.1-1.17 2.89-2.33.91-1.33 1.29-2.62 1.31-2.69-.03-.01-2.51-.96-2.53-3.82zM14.65 5.4c.66-.8 1.1-1.91.98-3.02-.95.04-2.09.63-2.77 1.43-.61.71-1.14 1.85-1 2.93 1.05.08 2.13-.54 2.79-1.34z" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id="gp-a" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#00D7FE" />
          <stop offset="1" stopColor="#0095F6" />
        </linearGradient>
        <linearGradient id="gp-b" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFD600" />
          <stop offset="1" stopColor="#FFAB00" />
        </linearGradient>
        <linearGradient id="gp-c" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FF4E4E" />
          <stop offset="1" stopColor="#E91E63" />
        </linearGradient>
        <linearGradient id="gp-d" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#00D060" />
          <stop offset="1" stopColor="#00A445" />
        </linearGradient>
      </defs>
      <path d="M3.6 2.3c-.4.3-.6.8-.6 1.4v16.6c0 .6.2 1.1.6 1.4l9.3-9.7z" fill="url(#gp-a)" />
      <path d="M16.5 9.2L3.6 2.3l9.3 9.7z" fill="url(#gp-b)" />
      <path d="M16.5 14.8L3.6 21.7l9.3-9.7z" fill="url(#gp-c)" />
      <path d="M20.2 12c0-.6-.3-1.1-.8-1.4l-2.9-1.5L13.6 12l2.9 2.9 2.9-1.5c.5-.3.8-.8.8-1.4z" fill="url(#gp-d)" />
    </svg>
  );
}

const labels = {
  apple: { top: 'Download on the', bottom: 'App Store', glow: 'shadow-glow-indigo border-neon-indigo/40' },
  google: { top: 'GET IT ON', bottom: 'Google Play', glow: 'shadow-glow-mint border-neon-mint/40' },
};

export default function StoreBadge({ store, onTry }: Props) {
  const cfg = labels[store];

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onTry?.();
  };

  return (
    <Tooltip label="Çok yakında 🚀" side="bottom">
      <button
        type="button"
        aria-disabled="true"
        onClick={handleClick}
        className={`group inline-flex items-center gap-3 rounded-2xl border bg-black px-5 py-3 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${cfg.glow}`}
      >
        <span className="text-white">{store === 'apple' ? <AppleIcon /> : <GoogleIcon />}</span>
        <span className="flex flex-col text-left">
          <span className="text-[9px] uppercase tracking-widest text-white/70">{cfg.top}</span>
          <span className="-mt-0.5 text-[16px] font-semibold leading-tight text-white">
            {cfg.bottom}
          </span>
        </span>
      </button>
    </Tooltip>
  );
}
