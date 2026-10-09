/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#05070d',
        navy: '#0a1020',
        panel: '#0e1626',
        edge: '#1c2a44',
        blood: '#d92b3a',
        cyan: { DEFAULT: '#22d3ee', dim: '#0e7490' },
      },
      fontFamily: {
        display: ['Oswald', 'Impact', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        flicker: {
          '0%,19%,21%,23%,25%,54%,56%,100%': { opacity: '1' },
          '20%,24%,55%': { opacity: '0.55' },
        },
        rise: {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        pulseRed: {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(217,43,58,0.0)' },
          '50%': { boxShadow: '0 0 24px 2px rgba(217,43,58,0.35)' },
        },
      },
      animation: {
        flicker: 'flicker 5s linear infinite',
        rise: 'rise 0.6s ease-out both',
        scan: 'scan 1.6s linear infinite',
        pulseRed: 'pulseRed 2.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
