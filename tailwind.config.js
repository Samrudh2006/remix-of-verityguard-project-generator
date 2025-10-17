/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6ee7b7',
        dark: '#0b0f1a',
        'dark-light': '#141b2d',
        'dark-lighter': '#1e2740'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #6ee7b7, 0 0 10px #6ee7b7' },
          '100%': { boxShadow: '0 0 10px #6ee7b7, 0 0 20px #6ee7b7, 0 0 30px #6ee7b7' },
        }
      }
    },
  },
  plugins: [],
}
