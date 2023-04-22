/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': {'min': '300px', 'max': '640px'},
      ...defaultTheme.screens,
    },
    extend: {},
  },
  plugins: [],
}

