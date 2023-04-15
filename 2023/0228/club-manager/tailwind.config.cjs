/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/*.{vue,js}", "./src/**/*.{vue,js}"],
  theme: {
    letterSpacing:{
      wider:'0.5em'
    },
    extend: {
      colors: {
        primaryColor: "#409eff"
      },
      margin: (() => {
        let obj = {};
        for (let i = 1; i <= 20; i++) {
          obj[i] = i + "px";
        }
        return obj;
      })(),
      padding: (() => {
        let obj = {};
        for (let i = 1; i <= 20; i++) {
          obj[i] = i + "px";
        }
        return obj;
      })(),
      width: (() => {
        let obj = {};
        for (let i = 1; i <= 20; i++) {
          obj[i] = i + "px";
        }
        return obj;
      })(),
      height: (() => {
        let obj = {};
        for (let i = 1; i <= 20; i++) {
          obj[i] = i + "px";
        }
        return obj;
      })(),
    },
  },
  plugins: []
}
