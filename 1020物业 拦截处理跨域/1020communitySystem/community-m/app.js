const http = require("http");
const express = require("express");
const app = express();

//添加一个拦截器
app.use((req, resp, next) => {
    console.log("拦住不许走");
    resp.setHeader("Access-Control-Allow-Origin", "*");
    resp.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
    resp.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});


//连接路由文件
app.use("/roomInfo", require("./routes/roomInfoRouter"));
app.use("/costType", require("./routes/costTypeRouter"));
app.use("/costInfo", require("./routes/costInfoRouter"));
app.use("/adminInfo", require("./routes/admininfoRouter"));




//配置启动服务器
const server = http.createServer(app);
server.listen(16888, "0.0.0.0", () => {
    console.log("服务器启动成功");
})