/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        prata: ['var(--font-prata)'],
        "work-sans": ['var(--font-work-sans)'],
        mono: ['var(--font-roboto-mono)'],
      },
    },
  },
  plugins: [],
}
