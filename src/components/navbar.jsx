/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-beige': '#D2C5B3', // اللون البيج في التصميم
        'brand-maroon': '#5D1212', // اللون العنابي للأزرار
      }
    },
  },
  plugins: [],
}