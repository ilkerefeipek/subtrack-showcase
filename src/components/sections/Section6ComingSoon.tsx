import { useEffect, useRef, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import StoreBadge from '../ui/StoreBadge';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export default function Section6ComingSoon() {
  const reduced = useReducedMotion();
  const [email, setEmail] = useState('');
  const [toast, setToast] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToast(null), 2400);
  };

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    };
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      showToast('Önce bir e-posta yaz 📧');
      return;
    }
    showToast('Teşekkürler! Beta açılınca haber vereceğiz 🚀');
    setEmail('');
  };

  return (
    <section
      id="coming-soon"
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-bg-base px-5 py-24"
    >
      {/* Decorative orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/4 top-1/3 h-[400px] w-[400px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{ background: 'radial-gradient(circle, #7B61FF 0%, transparent 70%)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-1/4 bottom-1/3 h-[300px] w-[300px] translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{ background: 'radial-gradient(circle, #00F5C4 0%, transparent 70%)' }}
      />

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center lg:max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[10px] uppercase tracking-[0.4em] text-neon-mint"
        >
          · Çok yakında ·
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mt-4 font-display font-bold leading-[0.9] tracking-tight text-white"
          style={{ fontSize: 'clamp(3.5rem, 13vw, 8rem)' }}
        >
          <motion.span
            animate={
              reduced
                ? undefined
                : {
                    textShadow: [
                      '0 0 24px rgba(123,97,255,0.4)',
                      '0 0 36px rgba(123,97,255,0.7)',
                      '0 0 24px rgba(123,97,255,0.4)',
                    ],
                  }
            }
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-block"
          >
            Yakında.
          </motion.span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-md text-[14px] leading-relaxed text-ink-secondary md:text-[16px]"
        >
          SubTrack mobil uygulaması beta erişimi için hazırlanıyor. Mağazalarda görüşmek üzere.
        </motion.p>

        {/* Store badges */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4 lg:gap-6"
        >
          <StoreBadge store="apple" onTry={() => showToast('Çok yakında 🚀')} />
          <StoreBadge store="google" onTry={() => showToast('Çok yakında 🚀')} />
        </motion.div>

        {/* Email form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 flex w-full max-w-md flex-col items-stretch gap-3"
        >
          <label
            htmlFor="beta-email"
            className="text-[10px] uppercase tracking-[0.3em] text-ink-secondary"
          >
            Beta erişimi için bizi takip et
          </label>
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-bg-surface/60 p-1.5 backdrop-blur-md focus-within:border-neon-indigo/50 focus-within:shadow-glow-indigo">
            <input
              id="beta-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ilker@example.com"
              autoComplete="email"
              className="min-w-0 flex-1 bg-transparent px-3 py-2 text-[13px] text-white placeholder:text-ink-muted focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-full bg-gradient-to-r from-neon-indigo to-neon-mint px-5 py-2 text-[12px] font-semibold uppercase tracking-wider text-bg-base transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Bildir
            </button>
          </div>
          <p className="text-left text-[10px] text-ink-muted">
            Hiçbir spam yok. Sadece çıkış haberi.
          </p>
        </motion.form>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast}
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.32, ease: 'easeOut' }}
            role="status"
            className="fixed bottom-8 left-1/2 z-[60] -translate-x-1/2 rounded-full border border-neon-mint/40 bg-bg-elevated px-5 py-3 text-[13px] font-medium text-white shadow-glow-mint"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
