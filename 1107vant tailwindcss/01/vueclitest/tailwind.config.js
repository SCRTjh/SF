/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html","./src/*.{js,vue}","./src/**/*.{vue,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins:{
    preflight:false
  }
}
