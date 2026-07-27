/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FFB7C5',
          light: '#FFD4DE',
          dark: '#FF8BA3',
        },
        secondary: {
          purple: '#E6E6FA',
          green: '#98FB98',
          'green-light': '#C1FFC1',
        },
        background: {
          DEFAULT: '#FFF5F5',
          card: '#FFFFFF',
        },
        text: {
          primary: '#333333',
          secondary: '#666666',
          muted: '#999999',
        },
        border: {
          DEFAULT: '#FFE4E9',
        },
      },
      borderRadius: {
        'sm': '12px',
        'md': '20px',
        'lg': '28px',
        'full': '50px',
      },
      boxShadow: {
        'light': '0 2px 8px rgba(255, 183, 197, 0.15)',
        'medium': '0 4px 16px rgba(255, 183, 197, 0.25)',
        'hover': '0 6px 24px rgba(255, 183, 197, 0.35)',
      },
      fontFamily: {
        sans: ['PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease',
        'typing': 'typing 1.4s infinite ease-in-out',
      },
      keyframes: {
        fadeIn: {
          'from': { opacity: '0', transform: 'translateY(10px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        typing: {
          '0%, 80%, 100%': { transform: 'scale(0.6)', opacity: '0.5' },
          '40%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
