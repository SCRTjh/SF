/**
 * 1、全局安装 mock-server 服务器包
 *      npm i @shymean/mock-server -g  系统中产生 mock 命令
 * 2、通过mock 命令去启动 服务器 js文件
 * mock -p 3001 -f ./mockjs搭建mock服务器.js
 * 3、通过浏览器  postman等工具访问该服务器  从而获取到数据
 */


const { Random } = require("mockjs");
const Mock = require("mockjs");

Mock.mock("/home","get",{
    code:200,
    msg:"获取数据成功",
    data:{
        "string|1-3":"※",
        title:Random.ctitle(4),
        img:Random.image("200x400"),
        arr:Random.pick(["北京","上海","广州","深圳"])
    }
})