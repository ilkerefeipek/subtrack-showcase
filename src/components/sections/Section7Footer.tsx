import { motion } from 'framer-motion';
import SubTrackLogo from '../ui/brands/SubTrackLogo';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface TeamMember {
  name: string;
  role: string;
}

const TEAM: TeamMember[] = [
  { name: 'İlker Efe İpek', role: 'CEO' },
  { name: 'Ersagun Kaplan', role: 'CTO' },
  { name: 'Mesut Şimekli', role: 'CMO' },
  { name: 'Burak Arıkan', role: 'CFO' },
];

export default function Section7Footer() {
  const reduced = useReducedMotion();

  return (
    <footer
      id="footer"
      className="relative w-full overflow-hidden border-t border-border-subtle bg-bg-base"
      style={{ boxShadow: 'inset 0 1px 0 rgba(123,97,255,0.2)' }}
    >
      {/* Neon top accent */}
      <div
        aria-hidden
        className="absolute left-0 right-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(123,97,255,0.6) 30%, rgba(0,245,196,0.6) 70%, transparent 100%)',
        }}
      />

      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-5 py-16 md:px-12 md:py-20">
        {/* Mobile: stacked. Desktop (lg+): 3-col grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_1.5fr_1fr] lg:gap-16">
          {/* Col 1 — Logo + tagline */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="flex flex-col items-start gap-4"
          >
            <motion.div
              animate={reduced ? undefined : { scale: [1, 1.05, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <SubTrackLogo size={48} />
            </motion.div>
            <p className="max-w-xs text-[14px] leading-snug text-ink-secondary">
              Aboneliklerinizi yöneten <span className="text-white">yapay zekâ.</span>
            </p>
            <p className="mt-4 max-w-sm text-[12px] leading-relaxed text-ink-muted">
              Banka API entegrasyonu · AI öneri motoru · tek tıkla iptal. Yakında mağazalarda.
            </p>
          </motion.div>

          {/* Col 2 — Team */}
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-ink-muted">Ekip</p>
              <p className="mt-2 text-[12px] text-ink-secondary">Girişimcilik dersi · Grup 2.4</p>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-2">
              {TEAM.map((m, i) => (
                <motion.div
                  key={m.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="flex flex-col gap-0.5"
                >
                  <p className="text-[13px] font-medium text-white">{m.name}</p>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-neon-mint">
                    {m.role}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Col 3 — Meta */}
          <div className="flex flex-col items-start gap-3 lg:items-end lg:text-right">
            <p className="text-[10px] uppercase tracking-[0.4em] text-ink-muted">Meta</p>
            <p className="font-mono text-[11px] text-ink-secondary">v1.0 · showcase build</p>
            <p className="font-mono text-[11px] text-ink-muted">girişimcilik dersi</p>
            <p className="font-mono text-[11px] text-ink-muted">2026</p>
            <a
              href="#hero"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.3em] text-ink-secondary transition-colors lg:hover:border-neon-mint/40 lg:hover:text-neon-mint"
            >
              ↑ Başa dön
            </a>
          </div>
        </div>

        <div className="h-px w-full bg-border-subtle" />

        <div className="flex flex-col items-start justify-between gap-3 text-[11px] text-ink-muted md:flex-row md:items-center">
          <p className="uppercase tracking-[0.3em]">SubTrack · 2026</p>
          <p className="font-mono">Made with neon and night ✦</p>
        </div>
      </div>
    </footer>
  );
}
