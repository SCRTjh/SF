const http = require("http");
const express = require("express");
const app = express();



//连接路由
app.use("/adminInfo", require("./routes/adminInfoRouter"));
app.use("/costInfo", require("./routes/costInfoRouter"));
app.use("/costType", require("./routes/costTypeRouter"));
app.use("/roomInfo", require("./routes/roomInfoRouter"));

const server = http.createServer(app);
server.listen(16888, "0.0.0.0", () => {
    console.log("服务器启动成功....");
})