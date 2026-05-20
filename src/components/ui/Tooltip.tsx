import { type ReactNode, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface Props {
  label: string;
  children: ReactNode;
  side?: 'top' | 'bottom';
}

export default function Tooltip({ label, children, side = 'top' }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onTouchStart={() => setOpen(true)}
      onTouchEnd={() => setTimeout(() => setOpen(false), 1400)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}
      <AnimatePresence>
        {open && (
          <motion.span
            initial={{ opacity: 0, y: side === 'top' ? 6 : -6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: side === 'top' ? 6 : -6, scale: 0.95 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            role="tooltip"
            className={`pointer-events-none absolute left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-bg-elevated px-3 py-1.5 text-[11px] font-medium text-white shadow-glow-indigo ${
              side === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'
            }`}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
