/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navy': '#0E3A60',
        'light-gray': '#F5F5F5',
        'muted-gray': '#D9D9D9',
        'accent-blue': '#2E6FB3',
      },
      fontFamily: {
        'heading': ['Merriweather', 'serif'],
        'body': ['Open Sans', 'sans-serif'],
      },
      lineHeight: {
        'relaxed': '1.6',
        'loose': '1.8',
      },
    },
  },
  plugins: [],
}