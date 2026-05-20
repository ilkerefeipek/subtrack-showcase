import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          base: '#08080F',
          surface: '#12121F',
          elevated: '#1A1A2E',
        },
        neon: {
          indigo: '#7B61FF',
          mint: '#00F5C4',
          magenta: '#FF2D9D',
        },
        ink: {
          primary: '#FFFFFF',
          secondary: '#A0A0B8',
          muted: '#5A5A78',
        },
        border: {
          subtle: '#1F1F35',
        },
      },
      fontFamily: {
        display: ['"Clash Display"', 'system-ui', 'sans-serif'],
        sans: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'glow-indigo': '0 0 40px rgba(123, 97, 255, 0.4)',
        'glow-indigo-lg': '0 0 80px rgba(123, 97, 255, 0.55)',
        'glow-mint': '0 0 40px rgba(0, 245, 196, 0.4)',
        'glow-mint-lg': '0 0 80px rgba(0, 245, 196, 0.55)',
        'glow-magenta': '0 0 40px rgba(255, 45, 157, 0.4)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bob': 'bob 2.2s ease-in-out infinite',
        'spin-slow': 'spin 24s linear infinite',
      },
      keyframes: {
        bob: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(6px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
