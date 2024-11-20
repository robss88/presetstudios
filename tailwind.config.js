/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#fd9000', // Orange
          background: '#1a1a1a' // Dark background
        },
        secondary: {
          DEFAULT: '#fee382', // Light orange/yellow
          background: '#242424' // Slightly lighter dark
        },
        text: {
          primary: '#ffffff', // White text
          secondary: '#9ca3af' // Gray text
        }
      }
    },
  },
  plugins: [],
}