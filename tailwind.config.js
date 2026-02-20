/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Syne', 'Inter', 'system-ui', 'sans-serif'],
        headline: ['Bebas Neue', 'Syne', 'system-ui', 'sans-serif'],
      },
      colors: {
        charcoal: '#1A1A1A',
      },
    },
  },
  plugins: [],
}


