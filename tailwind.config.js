/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    flowbite.content(),
  ],
  theme: {
    extend: {
      textShadow: {
        default: '2px 2px 4px rgba(0, 0, 0, 0.5)',
      },
      fontFamily: {
        sans: ['Roboto', 'Arial', 'sans-serif'],
        montserrat: ['Montserrat', 'Poppins', 'Quicksand'],
      },
    },
  },
  plugins: [
    require('tailwindcss-textshadow'),
    flowbite.plugin(),
  ],
}

