/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/tailwindcss-primeui/**/*.{js,ts}",
  ],
  safelist: [],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#F7F6FB',
          secondary: '#E6EAF3',
          quaternary: '#ECEBF0',
        },
        accent: '#9993F5',
        accent2: '#EDFC93',
      },
    },
  },
  plugins: ["tailwindcss-primeui"],
};
