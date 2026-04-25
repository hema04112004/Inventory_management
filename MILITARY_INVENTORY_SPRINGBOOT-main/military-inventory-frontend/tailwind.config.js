/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        camo: {
          900: '#0b1210',
          800: '#121a17',
          700: '#1c2a24',
          600: '#24362e',
          500: '#2f4a42',
          400: '#42685d',
          300: '#5a8478'
        }
      },
      borderRadius: {
        '2xl': '1.25rem'
      }
    }
  },
  plugins: []
}
