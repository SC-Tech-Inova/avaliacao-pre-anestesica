/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4299e1',
        secondary: '#e2e8f0',
        danger: '#e53e3e',
        success: '#28a745'
      }
    },
  },
  plugins: [],
}
