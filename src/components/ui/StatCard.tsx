import { type ReactNode } from 'react';

interface Props {
  value: ReactNode;
  label: string;
  accent?: 'indigo' | 'mint' | 'magenta';
  className?: string;
}

const accentClasses = {
  indigo: 'border-neon-indigo/30 shadow-[0_0_60px_-20px_rgba(123,97,255,0.55)]',
  mint: 'border-neon-mint/30 shadow-[0_0_60px_-20px_rgba(0,245,196,0.55)]',
  magenta: 'border-neon-magenta/30 shadow-[0_0_60px_-20px_rgba(255,45,157,0.55)]',
};

const valueColor = {
  indigo: 'text-neon-indigo text-glow-indigo',
  mint: 'text-neon-mint text-glow-mint',
  magenta: 'text-neon-magenta text-glow-magenta',
};

export default function StatCard({ value, label, accent = 'indigo', className }: Props) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border bg-bg-surface/60 p-6 backdrop-blur-sm ${accentClasses[accent]} ${className ?? ''}`}
    >
      <div className={`font-display text-[44px] font-bold leading-none ${valueColor[accent]}`}>
        {value}
      </div>
      <p className="mt-3 text-[12px] leading-snug text-ink-secondary">{label}</p>
      {/* Decorative line */}
      <span
        aria-hidden
        className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50"
      />
    </div>
  );
}
