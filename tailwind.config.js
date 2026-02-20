/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Syne', 'system-ui', 'sans-serif'],
        display: ['Syne', 'system-ui', 'sans-serif'],
        headline: ['Syne', 'system-ui', 'sans-serif'],
      },
      colors: {
        charcoal: '#1A1A1A',
      },
    },
  },
  plugins: [],
}


