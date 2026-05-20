# SubTrack — Showcase

> Aboneliklerinizi yöneten yapay zekâ.

Tek sayfa, mobil odaklı tanıtım sitesi. Apple ürün sayfası seviyesinde scroll-driven motion, neon estetik, 3D katmanlar, cursor/touch interactivity.

**Sunum amaçlıdır** — fonksiyonel ürün değil, görsel showcase.

---

## İçerik (8 section)

| # | Section | Mobile | Desktop (lg+) |
|---|---|---|---|
| 0 | Loader | animated check + wordmark + progress | — |
| 1 | Hero | center stack + phone peek | **split:** wordmark sol, full phone sağ, stat strip altta |
| 2 | Problem | `89%` tek kolon + 3 stat | **split:** `89%` sol, 3 stat dikey kolon sağ |
| 3 | Floating | 4 brand kart + cursor/touch repulsion | kartlar daha geniş yayılır, hover scale |
| 4 | Solution | 3 sticky alt-section + phone variant geçişleri | **split:** text sol, phone (büyük) sağ |
| 5 | Money Reveal | spotlight + ₺9.348 + mint rain | aynı pattern, daha geniş tipografi |
| **5.2** | **Calculator (yeni)** | "Bu para neye yeter?" + 46 sinema bileti (indigo) + 62 kahve (mint), vertical stack | yan yana 2 kart side-by-side |
| 6 | Coming Soon | "Yakında." + fake store badges + e-mail | butonlar yan yana, daha büyük |
| 7 | Footer | tek kolon | **3-col:** logo+tagline | ekip | meta |

---

## Hızlı Başlangıç

```bash
npm install
npm run dev
```

Tarayıcıda `http://127.0.0.1:5173/` adresine git. Mobil görünüm için DevTools → device emulation (iPhone 14 Pro tercih edilir).

### Yararlı parametreler

- `?nosmooth` → Lenis smooth scroll'u devre dışı bırakır (Playwright testleri için).

---

## Komutlar

| Komut | Açıklama |
|---|---|
| `npm run dev` | Dev server (HMR, ~5173) |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Build edilmiş sürümü local olarak servis et |
| `npm run lint` | ESLint kontrolü |
| `npm run format` | Prettier formatlama |
| `npm run test:visual` | Playwright görsel testler (mobile viewport, `--workers=1`) |

---

## Stack

- **Vite 5** + **React 18** + **TypeScript 5**
- **TailwindCSS 3** + CSS variables (design tokens)
- **GSAP 3** + ScrollTrigger + Flip (timeline animasyonları, scroll-driven motion)
- **Three.js** + **@react-three/fiber** + **@react-three/drei** (particle field, glow orbs)
- **Framer Motion 11** (component-level declarative animasyonlar)
- **Lenis** (smooth scroll, mobile-optimized lerp)
- **@fontsource** (self-hosted Inter Variable + JetBrains Mono); Clash Display Fontshare CDN'den
- **Playwright** (mobile viewport visual testing)

---

## Klasör Yapısı

```
src/
├── components/
│   ├── sections/    7 section component (Loader, Hero, Problem, Floating, Solution, Money, ComingSoon, Footer)
│   ├── three/       Three.js sahneleri (ParticleField, FloatingScene, NeuralLines)
│   └── ui/          Reusable primitives (PhoneMockup, NeonButton, Tooltip, StatCard, CountUp, StoreBadge, brands/)
├── hooks/           useReducedMotion, useLenisScroll, useInViewport, useDeviceOrientation
├── lib/             theme tokens, gsap-setup, animation factories
└── styles/          globals.css (Tailwind + CSS vars), fonts.css
```

---

## Responsive Strategy

| Breakpoint | Range | Davranış |
|---|---|---|
| mobile (default) | < 640 | Tek kolon, phone peek, küçük tipografi |
| `sm` | ≥ 640 | Tablet portrait — küçük polish |
| `md` | ≥ 768 | Tablet landscape — orta tipografi, S4 sticky split aktif |
| `lg` | ≥ 1024 | Desktop start — **split layout** S1/S2/S4/S5.2/S7, full phone S1 |
| `xl` | ≥ 1280 | Wide desktop — daha geniş gap, hero stat strip |
| `2xl` | ≥ 1536 | XWide — tipografi clamp üst sınırına yaklaşır |

**Hover micro-interactions** Tailwind'in `hover:` modifier'ı ile gate'lenir → `:hover` pseudo-class touch'ta tetiklenmez, mobil davranış otomatik no-op.

---

## Section 5.2 — Calculator

`₺9.348` reveal'ından sonra ikinci alt-sahne açılır. Hard-coded sabitler:

```ts
const yearlySavings = 9348;     // ₺
const ticketCost    = 200;      // ₺ / sinema bileti
const coffeeCost    = 150;      // ₺ / kahve fincanı
const tickets = Math.floor(yearlySavings / ticketCost);  // 46
const coffees = Math.floor(yearlySavings / coffeeCost);  // 62
```

İki kart yan yana (desktop) / dikey stack (mobile):
- **SİNEMA × 46** — neon indigo, custom `TicketIcon` SVG (perforated edge + barcode hint)
- **KAHVE × 62** — neon mint, custom `CoffeeIcon` SVG (trapezoid cup + lid + sleeve + steam)

Sayılar `IntersectionObserver` ile triggered count-up, ikonlar GSAP stagger ile grid'e dolar.

---

## Tasarım Sistemi

### Renkler

| Token | Hex | Kullanım |
|---|---|---|
| `bg-base` | `#08080F` | Ana karanlık zemin |
| `bg-surface` | `#12121F` | İkincil yüzey |
| `bg-elevated` | `#1A1A2E` | Card / elevated |
| `neon-indigo` | `#7B61FF` | Ana accent (electric purple-indigo) |
| `neon-mint` | `#00F5C4` | İkincil accent (cyan-mint) |
| `neon-magenta` | `#FF2D9D` | Üçüncül pop |

### Tipografi

- **Display:** Clash Display (Fontshare CDN, fallback system-ui)
- **Sans (body):** Inter Variable
- **Mono (sayılar):** JetBrains Mono

### Motion İlkeleri

- 60fps hedefli — sadece `transform` + `opacity` animate edilir.
- `prefers-reduced-motion: reduce` → büyük animasyonlar fade'e düşer.
- Three.js sahneleri görünürken aktif, off-screen'de IntersectionObserver ile durdurulur.

---

## GitHub Pages Deploy

1. Repo'yu GitHub'a push'la.
2. Repo Settings → Pages → Source: **GitHub Actions** seç.
3. `main` branch'e push olduğunda `.github/workflows/deploy.yml` çalışır:
   - `npm ci && npm run build` → `dist/` hazırlanır.
   - `dist/` Pages artifact'ı olarak yüklenir ve deploy edilir.
4. Workflow tamamlanınca `https://<username>.github.io/<repo-name>/` adresinde canlı olur.

### Custom domain (opsiyonel)

`vite.config.ts` içinde `base: './'` kullanıldığı için custom domain veya subpath fark etmez — relative path'ler her ikisinde çalışır.

---

## QR Sunumu

Production URL'i alıp QR kod oluştur:
- `https://www.qr-code-generator.com/` veya CLI: `qrencode -o subtrack.png 'https://<username>.github.io/subtrack-showcase/'`
- Sunumda projeksiyona QR'ı koy → izleyici telefonuyla okutsun → mobil deneyim direkt başlar.

---

## Erişilebilirlik

- WCAG AA renk kontrastı (neon accent'ler bg üzerinde 4.5:1+).
- `prefers-reduced-motion` desteklenir.
- Touch tap target'ları ≥ 44pt × 44pt.
- Form: native `<input type="email">` + label.
- Tüm dekoratif element'ler `aria-hidden="true"`.

---

## Bilinen Sınırlamalar

- **iOS Safari gyroscope:** Permission gerekir. Hero'daki "Hareketle deneyimle" CTA tap ile permission tetikler. Permission verilmezse cursor parallax fallback.
- **Three.js bundle:** ~180KB gzip (en büyük chunk). Mobile cellular'da ilk yükleme ~1-2s; sonraki ziyaretler service worker cache ile anında.
- **Initial JS:** ~380KB gzip toplam (250KB hedefin üzerinde, Three.js + drei nedeniyle). Code-splitting yapıldı (manualChunks).

---

## Ekip

Girişimcilik dersi · Grup 2.4

- İlker Efe İpek — CEO
- Ersagun Kaplan — CTO
- Mesut Şimekli — CMO
- Burak Arıkan — CFO

---

## License

Showcase amaçlıdır. Eğitim/sunum dışında kullanım için iletişime geç.
