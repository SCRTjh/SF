const http = require("http");
const express = require("express");
require("express-async-errors");
const app = express();
const bodyParser = require("body-parser");
// 这个叁数有可能以json的格式提交到后台 
app.use(bodyParser.json({ limit: "20mb" }));
// 还可以像?的参数一下拼接在地址栏的后面
app.use(bodyParser.urlencoded({ limit: "20mb", extended: false }));
const ResultJson = require("./model/ResultJson");



//添加一个拦截器
app.use((req, resp, next) => {
    //req：浏览器到服务器的请求
    //resp:服务器返回浏览器的
    //next:是否放行
    //颁发跨域能行证
    resp.setHeader("Access-Control-Allow-Origin", "*");
    resp.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    resp.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});

//连接路由文件
app.use("/roomInfo", require("./routes/roomInfoRouter"));
app.use("/costType", require("./routes/costTypeRouter"));
app.use("/costInfo", require("./routes/costInfoRouter"));
app.use("/adminInfo", require("./routes/adminInfoRouter"));
app.use("/dataView",require("./routes/dataViewRouter"));



//全局处理异常了
app.use((err, req, resp, next) => {
    console.log(err);
    let resultJson = new ResultJson(false, "服务器错误", err);
    resp.json(resultJson);
    next();
});

const server = http.createServer(app);
server.listen(16888, "0.0.0.0", () => {
    console.log("服务器启动成.....");
});