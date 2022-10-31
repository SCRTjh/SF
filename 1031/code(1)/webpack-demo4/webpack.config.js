/**
 * 生产环境的配置
 */
const path = require("path");
const HTMLWebapckPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

/**
 * @type {import("webpack").Configuration}
 */

const config = {
    target: ["web", "es5"],
    mode: "production",
    //入口,多页面的入口 ，可以以对象的形式去完成
    entry: {
        index: "./js/index.js",
    },
    //出口
    output: {
        path: path.join(__dirname, "./dist"),
        filename: "js/[name].[fullhash:8].js",
        publicPath: "./",
        clean: true
    },
    // 转换规则
    resolve: {
        //扩展名
        extensions: [".js"]
    },
    //模块
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/, exclude: /node_modules/,
                // use:["babel-loader"]
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]
            }
        ]
    },
    //插件
    plugins: [
        new HTMLWebapckPlugin({
            filename: "index.html",
            template: path.join(__dirname, "./index.html"),
            inject: true,
            chunks: ["index"]
        }),
        //打包的时候会显示进度条
        new webpack.ProgressPlugin(),
    ]
   
}


module.exports = config;


//如果有一个文件之前已经被 webpack处理了，不需要再次处理的时候 ，我们就可以放在`static`的目录下面
//最后再通过`CopyWebpackPlugin`来复制到目标目标就可以了