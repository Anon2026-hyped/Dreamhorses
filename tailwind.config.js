/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dh-blue': '#6b7db3',
        'dh-blue-dark': '#4a5a8a',
        'dh-green': '#5cb85c',
        'dh-green-hover': '#4cae4c',
        'dh-link': '#2255aa',
      },
      fontFamily: {
        'serif': ['Georgia', 'Times New Roman', 'serif'],
      },
    },
  },
  plugins: [],
}