/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#EFDF3A',
        'primary-dark': '#E5D52E',
      },
    },
  },
  plugins: [],
};