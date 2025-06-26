/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'wave': 'wave 25s linear infinite',
        'rise': 'rise var(--duration, 8s) linear forwards',
      },
      keyframes: {
        wave: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        rise: {
          '0%': { transform: 'translateY(0)', opacity: 0.8 },
          '100%': { transform: 'translateY(-100vh)', opacity: 0 }
        }
      },
      fontFamily: {
        sans: ['Urbanist', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};