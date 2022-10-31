/**
 * 开发环境的配置
 */

const path = require("path");
const HTMLWebapckPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

/**
 * @type {import("webpack").Configuration}
 */
const config = {
    target: ["web", "es5"],
    mode: "development",
    //入口,多页面的入口 ，可以以对象的形式去完成
    entry: {
        index: "./js/b.js",
    },
    output: {
        path: path.join(__dirname, "./dist"),
        filename: "js/[name].[fullhash:8].js",
    },
    // 转换规则
    resolve: {
        //扩展名
        extensions: [".js",".css",".json"]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                // use:["babel-loader"]
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]
            },

            //在开发模式下面，文件就不用管了
        ]
    },
    plugins: [
        new webpack.ProgressPlugin(),

        new HTMLWebapckPlugin({
            filename: "index.html",
            template: path.join(__dirname, "./index.html"),
            inject: true,
            chunks: ["index"]
        }),

    ],
    devServer: {
        host: "0.0.0.0",
        port: 8989,
        allowedHosts: "*",
        static: {
            directory: path.join(__dirname, "./dist/static")
        },
        //如果报错了，直接在客户端显示出来
        client: {
            overlay: true
        },
        //在没有配置这个`watchFiles`的情况下，如果我们更改html里面的内容 ，它是不会自动刷新的
        watchFiles: [
            "./index.html"
        ]
    }
}


module.exports = config;