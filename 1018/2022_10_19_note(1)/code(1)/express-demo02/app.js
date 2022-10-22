const http = require("http");
const express = require("express");
const app = express();

//现在的项目里面的四张表，这四张表对应的就是RoomInfo,CostTypeInfo,CostInfo,AdminInfo
//如果把4张表对应的所有的处理的请求全部写在app.js里面，这样非常大的问题，一旦这个文件有问题，整个程序就跑不起来
//在真正的开发里面，一般是团队开发、团队开发的时候 ，都是有模块划分 的
//如A负责RoomInfo的模块 ，B负责AdminInfo模块，其它人负责剩下的模块，那么不可能所有人都集中在app.js里面写代码

//连接路由文件
app.use("/roomInfo", require("./routes/roomInfoRoute"));
app.use("/costType", require("./routes/costTypeRoute"));




const server = http.createServer(app);
server.listen(16888, "0.0.0.0", () => {
    console.log("服务器启动成功");
});