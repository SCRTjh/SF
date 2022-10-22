// 这个模块是nodejs自带的模块
const http = require("http");
const express = require("express");
// 利用express框架 生成一个app的服务器应用程序
const app = express();


app.get("/", (req, resp) => {
    console.log("我在处理你的/的请求......", req.ip);
    resp.send("我收到你的请求了，你的IP地址是：" + req.ip);
});

app.get("/abc", (req, resp) => {
    resp.send("我现在访问是的abc");
});

app.get("/login", (req, resp) => {
    resp.json({
        userName: "张三",
        sex: "男",
        age: 18
    })
})



//创建一个服务器，服务器上面应该运行了app这个程序
const server = http.createServer(app);
//启动这个服务器
//在启动服务器这前，一定要先检查一下自己的电脑上面有哪些空闲的端口
// 0.0.0.0代表的是自己电脑上面所有的ip地址  
// http://127.0.0.1:16888/
server.listen(16888, "0.0.0.0", () => {
    console.log("服务器启动成功......");
});
