/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend:{
      colors: {
        indigo: '#5c6ac4',
        blue: '#0070f3',
        red: '#de3618',
        white: '#ffffff',
        bluetint: '#daf0ff',
      }
    }

  },
  plugins: [],
}