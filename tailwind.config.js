/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyan: '#00d4ff',
        purple: '#8a2be2',
        dark: '#0f0f1e',
      },
    },
  },
  plugins: [],
}
