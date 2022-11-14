/** @type {import('tailwindcss').Config} */
let config = {
  content: ["./public/index.html", "./src/*.{js,vue}", "./src/**/*.{vue,js}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "#008de1"
      },
      padding: (() => {
        let obj = {};
        for (let i = 1; i <= 20; i++) {
          obj[i] = i + "px";
        }
        return obj;
      })(),
      margin: (() => {
        let obj = {};
        for (let i = 1; i <= 20; i++) {
          obj[i] = i + "px";
        }
        return obj;
      })()
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
}

module.exports = config;
