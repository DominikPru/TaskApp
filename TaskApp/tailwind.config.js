const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Afacad', 'sans-serif'],
      },
      backgroundColor: {
        'dark-foreground': '#191919',
        'dark-brown': '#1A120B',
        'darker-brown': '#171009',
        'lighter-brown': '#3C2A21',
        'cream-white': '#D5CEA3'
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}