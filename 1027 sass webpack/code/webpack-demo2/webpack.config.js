const path = require("path");

/**
 * @type {import("webpack").Configuration}
 */
const config = {
    mode:"development",
    // 入口
    entry: "./js/index.js",
    // 出口
    output: {
        path: path.join(__dirname, "./dist"),
        filename: "bundle.js"
    },
    //loader
    module:{

    },
    //插件
    plugins:[
        
    ]
}

module.exports = config;