/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        willbry: {
          green: {
            50:  '#f0f7f0',
            100: '#e0f0e4',
            200: '#b8dfc4',
            300: '#7ec49a',
            400: '#52b788',
            500: '#2d6a4f',
            600: '#1e5c3f',
            700: '#1f4f2b',
            800: '#163720',
            900: '#0d2b18',
          },
          accent: '#e76f51',
          teal:   '#52b788',
          sand:   '#f5f0e8',
          light:  '#fafdf8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(13,43,24,0.07), 0 10px 20px -2px rgba(13,43,24,0.04)',
        'card': '0 1px 3px rgba(13,43,24,0.06), 0 4px 12px rgba(13,43,24,0.04)',
        'card-hover': '0 4px 20px rgba(13,43,24,0.10), 0 8px 24px rgba(13,43,24,0.06)',
        'nav': '0 1px 0 rgba(13,43,24,0.08)',
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease-out forwards',
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'slide-in': 'slideIn 0.3s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-8px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}