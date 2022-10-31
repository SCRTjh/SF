const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


/**
 * @type {import{"webpack"}.Configuration}
 */
const config = {
    target: ["web", "es5"],
    mode: "development",
    //入口
    entry: "./js/index.js",
    //出口
    output: {
        path: path.join(__dirname, "./dist"),
        filename: "budle.js",
        clean: true
    },
    //loader
    module: {
        rules: [
            //处理js文件
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: "babel-loader"
                }
                ]
            },
            //处理css文件
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: "../"
                        },
                    },
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                        }
                    },
                    "postcss-loader"
                ]
            },
            {
                test: /\.s[ca]ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: "../"
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {
                            importLoader: 2,

                        }
                    },
                    "postcss-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.jpe?g|png|svg|bmp|gif$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 8 * 1024,
                        name: "[name].[hash:8].[ext]",
                        outputPath: "img/",
                        esModule: false,
                    }
                }
                ],
                type: "javascript/auto"
            },
            {
                test: /\.html$/,
                use: [
                    "html-loader"
                ]

            }
        ],
    },
    //插件
    plugins: [
        new HtmlWebpackPlugin({
            //源文件
            template: path.join(__dirname, "index.html"),
            //生成的目标文件的名称
            filename: "index.html",
            //把打包的js文件或后期的文件也通过标签链接进去
            inject: true
        }),
        new MiniCssExtractPlugin({
            filename: "css/index.[hash:8].css",
            ignoreOrder: false
        })
    ]

}

module.exports = config;