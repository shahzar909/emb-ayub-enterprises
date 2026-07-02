import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      colors: {
  brand: {
    purple: '#431E6F',
    'purple-light': '#5A2D82',
    'purple-dark': '#2C114B',

    gold: '#C89A45',
    'gold-light': '#D8B25C',
    'gold-dark': '#A9782D',
  },

  surface: {
    DEFAULT: '#FFFFFF',
    secondary: '#F7F4FB',
    tertiary: '#EFE8F9',
  },

  ink: {
    DEFAULT: '#2C114B',
    secondary: '#5D5370',
    tertiary: '#827792',
    quaternary: '#A89DB5',
  },

  border: {
    DEFAULT: '#E3D8F1',
    strong: '#CDB8E5',
  },
},
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '120': '30rem',
        '128': '32rem',
        '140': '35rem',
        '160': '40rem',
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem' }],
        '8xl': ['5.5rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
        '9xl': ['7rem', { lineHeight: '1', letterSpacing: '-0.03em' }],
        '10xl': ['8.5rem', { lineHeight: '1', letterSpacing: '-0.04em' }],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        float: 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
  'card-hover':
      '0 20px 60px -10px rgba(44,17,75,.15)',

  'venture-card':
      '0 8px 30px rgba(44,17,75,.08)',

  'nav-glass':
      '0 1px 0 rgba(255,255,255,.08)',
},
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
