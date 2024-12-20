/** @type {import('tailwindcss').Config} */
import flowbite from "flowbite-react/tailwind";
import textShadowPlugin from "tailwindcss-textshadow";

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
    textShadowPlugin,
    flowbite.plugin(),
  ],
};
