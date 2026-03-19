/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        plum:  { DEFAULT: '#4A0E2E', 50: '#f9f0f4', 100: '#f0d4e3', 900: '#2d0820' },
        rose:  { DEFAULT: '#A0266A', light: '#c2417f' },
        blush: { DEFAULT: '#F4A7B9' },
        gold:  { DEFAULT: '#C9A84C', light: '#dfc270' },
        ivory: { DEFAULT: '#F5F0E8', dark: '#ede6d8' },
        sage:  { DEFAULT: '#2D4739', light: '#3d5e4c' },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans:  ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up':    'fadeUp 0.7s ease forwards',
        'fade-up-d1': 'fadeUp 0.7s 0.15s ease forwards',
        'fade-up-d2': 'fadeUp 0.7s 0.3s ease forwards',
        'fade-up-d3': 'fadeUp 0.7s 0.45s ease forwards',
        'fade-in':    'fadeIn 1s ease forwards',
      },
    },
  },
  plugins: [],
}
