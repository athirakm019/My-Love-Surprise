/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        princess: {
          babypink: '#FFD6E7',
          softpink: '#FFB6D5',
          rosepink: '#FF69A6',
          deeppink: '#E84383',
          lavender: '#E6D5FF',
          gold: '#F5DFA5',
          cream: '#FFF9FB',
        }
      },
      fontFamily: {
        cursive: ['"Great Vibes"', 'cursive'],
        handwriting: ['"Dancing Script"', 'cursive'],
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Nunito"', 'sans-serif'],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-medium': 'float 4s ease-in-out infinite',
        'float-fast': 'float 2.5s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s infinite',
        'sparkle': 'sparkle 1.8s infinite ease-in-out',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-18px) rotate(4deg)' },
        },
        pulseGlow: {
          '0%, 100%': {
            boxShadow: '0 0 15px rgba(255, 105, 166, 0.4), 0 0 30px rgba(232, 67, 131, 0.2)',
          },
          '50%': {
            boxShadow: '0 0 30px rgba(255, 105, 166, 0.8), 0 0 50px rgba(232, 67, 131, 0.5)',
          },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.15)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.15)' },
          '70%': { transform: 'scale(1)' },
        }
      }
    },
  },
  plugins: [],
}
