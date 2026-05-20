import { type ReactNode, useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap-setup';
import NetflixLogo from './brands/NetflixLogo';
import SpotifyLogo from './brands/SpotifyLogo';
import HBOMaxLogo from './brands/HBOMaxLogo';
import AdobeCCLogo from './brands/AdobeCCLogo';

export type PhoneVariant = 'home' | 'detected' | 'ai-suggestion' | 'cancel';

interface Props {
  variant?: PhoneVariant;
  scale?: number;
  className?: string;
  children?: ReactNode;
}

interface Subscription {
  brand: 'netflix' | 'spotify' | 'hbo' | 'adobe';
  name: string;
  meta: string;
  price: string;
  warn?: boolean;
  removed?: boolean;
}

const SUBS_FULL: Subscription[] = [
  { brand: 'netflix', name: 'Netflix', meta: 'Standart · yenileme 15 gün', price: '₺149' },
  { brand: 'spotify', name: 'Spotify', meta: '23 gündür kullanılmıyor', price: '₺79', warn: true },
  { brand: 'hbo', name: 'HBO Max', meta: 'Standart · yenileme 8 gün', price: '₺189' },
  { brand: 'adobe', name: 'Adobe CC', meta: '47 gündür kullanılmıyor', price: '₺430', warn: true },
];

function BrandIcon({ brand }: { brand: Subscription['brand'] }) {
  const size = 36;
  switch (brand) {
    case 'netflix':
      return <NetflixLogo size={size} />;
    case 'spotify':
      return <SpotifyLogo size={size} />;
    case 'hbo':
      return <HBOMaxLogo size={size} />;
    case 'adobe':
      return <AdobeCCLogo size={size} />;
  }
}

function SubRow({ sub, removing }: { sub: Subscription; removing?: boolean }) {
  return (
    <div
      data-sub={sub.brand}
      data-warn={sub.warn ? 'true' : 'false'}
      className={`flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-3 transition-all ${
        removing ? 'opacity-30 translate-x-12' : ''
      }`}
    >
      <BrandIcon brand={sub.brand} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className="truncate text-[13px] font-semibold text-white">{sub.name}</span>
          {sub.warn && (
            <span className="rounded-full bg-neon-magenta/15 px-1.5 py-px text-[9px] font-medium uppercase tracking-wider text-neon-magenta">
              uyarı
            </span>
          )}
        </div>
        <p className={`truncate text-[10.5px] ${sub.warn ? 'text-neon-magenta/90' : 'text-ink-secondary'}`}>
          {sub.meta}
        </p>
      </div>
      <div className="text-right">
        <span className="font-mono text-[13px] font-medium text-white">{sub.price}</span>
        <p className="text-[9px] text-ink-muted">/ay</p>
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-6 pt-2 pb-1 text-[10px] font-medium text-white/80">
      <span className="font-mono">09:41</span>
      <div className="flex items-center gap-1">
        <span className="h-1 w-3 rounded-sm bg-white/70" />
        <span className="h-1 w-3 rounded-sm bg-white/70" />
        <span className="ml-1 h-2 w-3.5 rounded-sm border border-white/70 px-px">
          <span className="block h-full w-full rounded-[1px] bg-white/70" />
        </span>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="px-5 pt-4">
      <p className="text-[12px] text-ink-secondary">Merhaba İlker,</p>
      <h2 className="mt-0.5 font-display text-[26px] font-semibold leading-tight text-white">
        Aboneliklerim
      </h2>
    </div>
  );
}

function TotalCard() {
  return (
    <div className="mx-5 mt-4 overflow-hidden rounded-2xl border border-neon-indigo/30 bg-gradient-to-br from-neon-indigo/15 via-bg-elevated to-bg-elevated p-4">
      <p className="text-[11px] uppercase tracking-wider text-ink-secondary">
        Bu ay toplam harcama
      </p>
      <p className="mt-1 font-display text-[34px] font-bold leading-none text-white">
        ₺ 847<span className="text-white/70">,50</span>
      </p>
      <p className="mt-2 flex items-center gap-1 text-[11px] text-neon-mint">
        <span className="inline-block">↓</span>
        <span>Geçen aya göre %12 azaldı</span>
      </p>
    </div>
  );
}

function SuggestionCard({ pulse = false }: { pulse?: boolean }) {
  return (
    <div
      data-sub="ai-suggestion"
      className={`mx-5 mt-3 rounded-2xl border border-neon-mint/40 bg-neon-mint/[0.06] p-3 ${
        pulse ? 'animate-pulse-slow' : ''
      }`}
      style={{
        boxShadow: '0 0 28px rgba(0, 245, 196, 0.18)',
      }}
    >
      <div className="flex items-center gap-2">
        <span className="grid h-6 w-6 place-items-center rounded-full bg-neon-mint/20 text-[11px] font-bold text-neon-mint">
          AI
        </span>
        <p className="text-[11px] font-semibold text-white">Akıllı öneri</p>
      </div>
      <p className="mt-2 text-[11.5px] leading-snug text-white">
        Spotify ve Adobe CC iptal edilirse yılda{' '}
        <span className="font-mono font-bold text-neon-mint">₺9.348</span> tasarruf edersin.
      </p>
    </div>
  );
}

function HomeScreen({ removeAdobe = false }: { removeAdobe?: boolean }) {
  return (
    <>
      <Header />
      <TotalCard />
      <div className="mt-4 flex items-center justify-between px-5">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-secondary">
          Tekrarlayan
        </p>
        <p className="text-[10px] text-ink-muted">4 servis</p>
      </div>
      <div className="mt-2 flex flex-col gap-2 px-5">
        {SUBS_FULL.map((s) => (
          <SubRow key={s.brand} sub={s} removing={removeAdobe && s.brand === 'adobe'} />
        ))}
      </div>
    </>
  );
}

function CancelledOverlay() {
  return (
    <div className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 rounded-full border border-neon-mint/50 bg-bg-elevated px-4 py-2 text-[11px] font-semibold text-neon-mint shadow-glow-mint">
      ✓ Adobe CC iptal edildi
    </div>
  );
}

function DetectedAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const rows = el.querySelectorAll<HTMLElement>('[data-detect-row]');
    gsap.fromTo(
      rows,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.55, stagger: 0.18, ease: 'expo.out', delay: 0.4 },
    );
  }, []);

  return (
    <div ref={containerRef}>
      <Header />
      <div className="px-5 pt-2">
        <p className="text-[11px] text-ink-secondary">Banka API taraması...</p>
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/5">
          <div
            className="h-full w-1/2 rounded-full bg-gradient-to-r from-neon-indigo to-neon-mint"
            style={{ animation: 'detect-scan 1.6s ease-in-out infinite' }}
          />
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-2 px-5">
        {SUBS_FULL.map((s, i) => (
          <div
            key={s.brand}
            data-detect-row={i}
            style={{
              opacity: 0,
            }}
          >
            <SubRow sub={s} />
          </div>
        ))}
      </div>
      <style>{`
        @keyframes detect-scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
}

export default function PhoneMockup({ variant = 'home', scale = 1, className, children }: Props) {
  return (
    <div
      className={`relative ${className ?? ''}`}
      style={{
        width: 320 * scale,
        height: 658 * scale,
      }}
    >
      <div
        className="relative"
        style={{
          width: 320,
          height: 658,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      >
      {/* Frame */}
      <div
        className="absolute inset-0 rounded-[44px]"
        style={{
          background: 'linear-gradient(150deg, #2A2A45 0%, #0F0F1A 60%, #1A1A2E 100%)',
          boxShadow:
            '0 0 0 1px rgba(255,255,255,0.04), 0 30px 80px -20px rgba(123, 97, 255, 0.4), 0 50px 120px -30px rgba(0, 245, 196, 0.18)',
          padding: 6,
        }}
      >
        {/* Screen */}
        <div className="relative h-full w-full overflow-hidden rounded-[38px] bg-bg-base bg-noise">
          <StatusBar />
          {/* Dynamic island */}
          <div className="pointer-events-none absolute left-1/2 top-2 z-20 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />

          <div className="relative pt-2 pb-6">
            {variant === 'home' && <HomeScreen />}
            {variant === 'detected' && <DetectedAnimation />}
            {variant === 'ai-suggestion' && (
              <>
                <Header />
                <TotalCard />
                <SuggestionCard pulse />
                <div className="mt-3 flex flex-col gap-2 px-5">
                  {SUBS_FULL.map((s) => (
                    <SubRow key={s.brand} sub={s} />
                  ))}
                </div>
              </>
            )}
            {variant === 'cancel' && (
              <>
                <Header />
                <TotalCard />
                <SuggestionCard />
                <div className="mt-3 flex flex-col gap-2 px-5">
                  {SUBS_FULL.map((s) => (
                    <SubRow key={s.brand} sub={s} removing={s.brand === 'adobe'} />
                  ))}
                </div>
              </>
            )}
            {children}
          </div>
          {variant === 'cancel' && <CancelledOverlay />}

          {/* Bottom indicator */}
          <div className="pointer-events-none absolute bottom-2 left-1/2 h-1 w-28 -translate-x-1/2 rounded-full bg-white/30" />
        </div>
      </div>
      </div>
    </div>
  );
}
