/**
 * 开发环境的配置
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
    mode: "development",
    //入口,多页面的入口 ，可以以对象的形式去完成
    entry: {
        index: "./js/index.js",
        login: "./js/login.js"
    },
    output: {
        path: path.join(__dirname, "./dist"),
        filename: "js/[name].[fullhash:8].js",
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
            }, {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1
                        }
                    },
                    "postcss-loader"
                ]
            },
            {
                test: /\.s[ca]ss$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 2
                        }
                    },
                    "postcss-loader",
                    "sass-loader"
                ]
            },

            //在开发模式下面，文件就不用管了
        ]
    },
    plugins: [
        new webpack.ProgressPlugin(),
        //定义全局变量，如jquery
        new webpack.ProvidePlugin({
            "$": "jquery",
            "jQuery": "jquery",
            "window.jquery": "jquery"
        }),
        new HTMLWebapckPlugin({
            filename: "index.html",
            template: path.join(__dirname, "./index.html"),
            inject: true,
            chunks: ["index"]
        }),
        new HTMLWebapckPlugin({
            filename: "login.html",
            template: path.join(__dirname, "./login.html"),
            inject: true,
            chunks: ["login"]
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.join(__dirname, "./static"),
                    to: path.join(__dirname, "./dist/static")
                }
            ]
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
            "./index.html",
            "./login.html"
        ]
    }
}


module.exports = config;