export const theme = {
  color: {
    bgBase: '#08080F',
    bgSurface: '#12121F',
    bgElevated: '#1A1A2E',
    neonIndigo: '#7B61FF',
    neonMint: '#00F5C4',
    neonMagenta: '#FF2D9D',
    textPrimary: '#FFFFFF',
    textSecondary: '#A0A0B8',
    textMuted: '#5A5A78',
    borderSubtle: '#1F1F35',
  },
  ease: {
    expo: 'expo.out',
    expoIn: 'expo.in',
    smooth: 'power3.out',
    snap: 'power4.out',
  },
  duration: {
    quick: 0.4,
    base: 0.8,
    long: 1.4,
  },
} as const;

export type ThemeColor = keyof typeof theme.color;
