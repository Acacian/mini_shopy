/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./client/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main': '#fc6281',
        'grey': '#d4d4d4'
      },
      backgroundImage: {
        banner: `url('../public/image/banner.jpg')`,
      },
    },
  },
  plugins: [],
}
