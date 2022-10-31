const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
//压缩CSS，并分离CSS为一个单独的文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

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
        filename: "js/bundle.[hash:8].js",
        publicPath: "./"
        // 自带的清除
        // clean:true
    },
    //模块，也就是加载器loader,当你去import一个文件时候 就会触发这个module里面的loader
    module: {
        //你在import的时候会导入不同的文件 ，我们要根据不同的文件来制定不同的规则
        rules: [
            {
                //如果我在import的时候发现你的后缀名是.js的文件，那么我就要使用babel去转换一下，
                //将你转换成es5的代码
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]
            }, {
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
            }, {
                test: /\.s[ca]ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 2
                        }
                    },
                    "postcss-loader",
                    "sass-loader"
                ]
            }, {
                test: /\.(jpe?g|bmp|svg|gif|png)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            // 小于8KB以后的图片就转base64,否则就不转
                            limit: 8 * 1024,
                            name: "[name].[hash:8].[ext]",
                            outputPath: "img/",
                            esModule: false,
                            publicPath:"../img"
                        }
                    }
                ],
                type: "javascript/auto"
            }, {
                test: /\.(ttf|eot|woff|woff2)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            // 小于8KB以后的图片就转base64,否则就不转
                            limit: 8 * 1024,
                            name: "[name].[hash:8].[ext]",
                            outputPath: "fonts/",
                            esModule: false,
                            publicPath:"../fonts"
                        }
                    }
                ],
                type: "javascript/auto"
            }
        ]
    },
    //插件
    plugins: [
        new HTMLWebpackPlugin({
            // 源文件
            template: path.join(__dirname, "index.html"),
            // 生成的目标文件的名称
            filename: "index.html",
            // 把打包的js文件或后期的css文件也通过标签链接进去
            inject: true
        }),
        new CleanWebpackPlugin(),
        //配置CSS的分离插件
        new MiniCssExtractPlugin({
            filename: "css/index.[hash:8].css",
            ignoreOrder: false
        }),
        //打包的时候显示进度条
        new webpack.ProgressPlugin()
    ]
}

module.exports = config;

