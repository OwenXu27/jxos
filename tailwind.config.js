/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        chicago: ['Chicago', 'Geneva', 'Arial', 'sans-serif'],
        geneva: ['Geneva', 'Arial', 'sans-serif'],
        monaco: ['Monaco', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}