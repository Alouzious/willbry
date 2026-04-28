/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        willbry: {
          green: {
            50:  '#f0f7e8',
            100: '#e8f5e9',
            500: '#2d6a4f',
            700: '#1f4f2b',
            900: '#0d2b18',
          },
          accent: '#e76f51',
          teal:   '#52b788',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
