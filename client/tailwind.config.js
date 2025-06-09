/** @type {import('tailwindcss').Config} */

const scrollbar = require('tailwind-scrollbar');
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Roboto: ['Roboto', 'sans-serif'], // Google font
         // Local font
      },

    },
  },
  plugins: [
     scrollbar,
  ]
}