/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        olive: {
          50:  '#f5f7e8',
          100: '#e8edcc',
          200: '#d1db99',
          300: '#b5c45f',
          400: '#96aa30',
          500: '#768c1e',
          600: '#5c6e16',
          700: '#445214',
          800: '#2e3a0e',
          900: '#1a2208',
        },
        gold: {
          300: '#d4a847',
          400: '#c49030',
          500: '#a87820',
        },
        cream: '#f5f0e8',
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body:    ['var(--font-body)',    'sans-serif'],
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, #1a2208 0%, #2e4a10 30%, #5c7a1a 60%, #8a9e2a 100%)',
        'gradient-card': 'linear-gradient(145deg, #2e3a0e, #445214)',
      },
    },
  },
  plugins: [],
}
