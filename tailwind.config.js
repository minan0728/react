/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        '3xl': '1700px',
      },
      colors: {
        warm: {
          bg: '#FAF7F2',
          card: '#FFFFFF',
          'card-subtle': '#F4EFE6',
          text: '#2D2621',
          'text-muted': '#7C7267',
          peach: '#F4A261',
          'peach-light': '#FCEADE',
          coral: '#E76F51',
          matcha: '#8AB07D',
          border: 'rgba(45, 38, 33, 0.08)',
          'border-hover': 'rgba(244, 162, 97, 0.4)',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Outfit"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'warm-sm': '0 2px 8px rgba(45, 38, 33, 0.04)',
        'warm-md': '0 8px 24px rgba(45, 38, 33, 0.06)',
        'warm-lg': '0 16px 40px rgba(45, 38, 33, 0.08)',
        'warm-glow': '0 0 32px rgba(244, 162, 97, 0.25)',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}
