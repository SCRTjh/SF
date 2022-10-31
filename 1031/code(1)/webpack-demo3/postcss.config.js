//这里就是postcss的配置文件
module.exports = {
    plugins: [
        require("postcss-import"),
        require("postcss-cssnext"),
        require("cssnano")
    ]
}