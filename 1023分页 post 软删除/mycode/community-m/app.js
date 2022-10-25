const http = require("http");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

//post
app.use(bodyParser.json({ limit: "20mb" }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: false }));

//拦截器
app.use((req, resp, next) => {
    resp.setHeader("Access-Control-Allow-Origin", "*");
    resp.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,OPTIONS");
    resp.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
})


//路由
app.use("/roomInfo", require("./routes/roomInfoRouter"));
app.use("/adminInfo", require("./routes/adminInfoRouter"));

const server = http.createServer(app);
server.listen(16888, "0.0.0.0", () => {
    console.log("服务器启动成功");
})