/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/*.{js,vue}", "./src/**/*.{vue,js}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "#008de1"
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
}
