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
          violetaA: 'var(--nouz-violetaA)',
          violetaB: 'var(--nouz-violetaB)',

          blanco: 'var(--nouz-blanco)',

          grisA: 'var(--nouz-grisA)',
          grisB: 'var(--nouz-grisB)',
          grisC: 'var(--nouz-grisC)',

          negro: 'var(--nouz-negro)',

          celesteA: 'var(--nouz-celesteA)',
        },

      fontFamily: {
        heavitas: ['Heavitas', 'sans-serif'],
        myriad: ['MyriadPro', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },

      backdropBlur: {
        glass: '12px',
      },
    },
  },
};
