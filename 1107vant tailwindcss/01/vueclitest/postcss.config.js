module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    "postcss-pxtorem": {
      rootValue: 100,
      mediaQuery: false,
      propList: ["*"]
    }
  },
}
