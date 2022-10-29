const path = require("path");

/**
 * @type {import{"webpack"}.Configuration}
 */
const config = {
    //入口
    entry:"./js/index.js",
    //出口
    output:{
        path:path.join(__dirname,"./dist"),
        filename:"budle.js"
    },
    //loader
    module:{
        rules:[
            //处理js文件
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use:[{
                    loader:"babel-loader"
                }
                ]
            }
        ],
    },
    //插件
    plugins:{

    }

}

module.exports = config;