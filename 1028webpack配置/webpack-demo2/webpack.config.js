const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

/**
 * @type {import("webpack").Configuration}
 */
const config = {
    target: ["web", "es5"],
    mode: "development",
    // 入口
    entry: "./js/index.js",
    // 出口
    output: {
        path: path.join(__dirname, "./dist"),
        publicPath: "./",
        filename: "bundle.[hash:8].js",
        clean: true
    },
    //loader
    module: {
        rules: [
            {
                test: /\.js/,
                // use:["babel-loader"]
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
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
            // {
            //     test: /\.(jpe?g|png|svg|bmp|gif|ico|tif$)/,
            //     use: [{
            //         loader: "url-loader",
            //         options: {
            //             limit: 8 * 1024,
            //             name: "[name].[hash:8].[ext]",
            //             outputPath: "/img",
            //             publicPath: "./"
            //         }
            //     }]
            // },
            // {
            //     test: /.(ttf|eot|woff|woff2)$/,
            //     use: [{
            //         loader: "url-loader",
            //         options: {
            //             limit: 10,
            //             name: "[name].[hash:8].[ext]",
            //             outputPath: "/fonts",
            //             publicPath: "../fonts"
            //         }
            //     }
            //     ]
            // },
            {
                test: /\.html$/,
                loader: "html-loader"
            }
        ]
    },
    //插件
    plugins: [
        new HTMLWebpackPlugin({
            //源文件
            template: path.join(__dirname, "index.html"),
            //目标文件
            filename: "index.html",
            //注入资源链接
            inject: true
        }),
        // new CleanWebpackPlugin()
        new MiniCssExtractPlugin({
            filename: "index.[hash:8].css",
            ignoreOrder: false
        })
    ]
}

module.exports = config;

