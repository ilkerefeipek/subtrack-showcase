import { type ButtonHTMLAttributes, forwardRef } from 'react';

type Variant = 'indigo' | 'mint' | 'ghost';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: 'sm' | 'md' | 'lg';
}

const variantClasses: Record<Variant, string> = {
  indigo:
    'bg-neon-indigo/15 border-neon-indigo/40 text-white hover:bg-neon-indigo/25 active:bg-neon-indigo/30 shadow-[0_0_30px_-8px_rgba(123,97,255,0.6)] hover:shadow-[0_0_40px_-4px_rgba(123,97,255,0.85)]',
  mint:
    'bg-neon-mint/15 border-neon-mint/40 text-neon-mint hover:bg-neon-mint/25 active:bg-neon-mint/30 shadow-[0_0_30px_-8px_rgba(0,245,196,0.55)] hover:shadow-[0_0_40px_-4px_rgba(0,245,196,0.85)]',
  ghost: 'bg-white/[0.04] border-white/10 text-ink-primary hover:bg-white/[0.08]',
};

const sizeClasses = {
  sm: 'h-9 px-3.5 text-[12px] gap-1.5',
  md: 'h-11 px-5 text-[13px] gap-2',
  lg: 'h-13 px-6 text-[14px] gap-2.5',
};

const NeonButton = forwardRef<HTMLButtonElement, Props>(function NeonButton(
  { variant = 'indigo', size = 'md', className, children, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      className={`inline-flex items-center justify-center rounded-full border font-medium uppercase tracking-wider backdrop-blur-sm transition-all duration-200 active:scale-[0.97] ${variantClasses[variant]} ${sizeClasses[size]} ${className ?? ''}`}
      {...rest}
    >
      {children}
    </button>
  );
});

export default NeonButton;
