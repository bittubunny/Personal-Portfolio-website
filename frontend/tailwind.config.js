/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#070a12',
          900: '#0c1220',
          850: '#11192c',
          800: '#17223b',
          700: '#223254',
          border: 'rgba(56, 189, 248, 0.16)',
          'border-subtle': 'rgba(255, 255, 255, 0.08)',
        },
        brand: {
          sky: '#38bdf8',
          cyan: '#06b6d4',
          blue: '#2563eb',
          indigo: '#6366f1',
          emerald: '#10b981',
          amber: '#f59e0b',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Syne', '"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'float-slow': 'floatSlow 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        }
      },
      boxShadow: {
        'neon-sky': '0 0 30px -5px rgba(56, 189, 248, 0.35)',
        'neon-emerald': '0 0 30px -5px rgba(16, 185, 129, 0.35)',
        'executive-card': '0 15px 35px -10px rgba(0, 0, 0, 0.5), 0 0 1px 1px rgba(255, 255, 255, 0.08)',
      }
    },
  },
  plugins: [],
}
