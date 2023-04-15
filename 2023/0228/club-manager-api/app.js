const http = require("http");
const path = require("path");
const express = require("express");
require("express-async-errors");
//ajax跨域配置
const cors = require("cors");
const app = express();
app.use(cors({
    origin: "*"
}))
app.options("*", cors());
const bodyParser = require("body-parser");
// 这个叁数有可能以json的格式提交到后台 
app.use(bodyParser.json({limit: "20mb"}));
// 还可以像?的参数一下拼接在地址栏的后面
app.use(bodyParser.urlencoded({limit: "20mb", extended: false}));
app.use("/uploadImages", express.static(path.join(__dirname, "./uploadImages")));
const ResultJson = require("./model/ResultJson");
const AppConfig = require("./config/AppConfig");
const jwt = require("jsonwebtoken");
const authMiddleware = require("./middleware/authMiddleware");



//添加一个拦截器
app.use((req, resp, next) => {
    //req：浏览器到服务器的请求    //resp:服务器返回浏览器的     //next:是否放行
    //颁发跨域能行证
    resp.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
    resp.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    resp.setHeader("Access-Control-Allow-Headers", "Content-Type,authorization");
    next();
});

//再添加一个拦截器
app.use((req, resp, next) => {
    //第一步：检查请求是否是预检的options请求
    if (req.method.toUpperCase() === "OPTIONS") {
        next();
    } else {
        let token = req.header("authorization") || req.query.authorization;
        if (token) {
            //说明这个人带了令牌，我们就要去验证这个令牌
            try {
                let decode = jwt.verify(token, AppConfig.secret);
                //如果没有报错，就说明是令牌验证成功了
                next();
            } catch (e) {
                //如果报错了，就说明是令牌验证失败了
                let resultJson = new ResultJson(false, "令牌验证失败");
                resp.status(403).json(resultJson);
            }

        } else {
            //说明这个人没有带令牌
            //1.这是一些特殊的路径，要直接放行，如登录
            let flag = AppConfig.noRequireAuth.some(item => item.test(req.path));
            if (flag) {
                //说明是特殊路径，我们要放行
                next();
            } else {
                //2.说明不是特殊路径,就直接返回403的状态
                let resultJson = new ResultJson(false, "请求未授权");
                resp.status(403).json(resultJson);
            }
        }
    }
});

//连接路由
app.use("/userInfo",require("./router/userInfoRouter"));
app.use("/clubInfo",require("./router/clubInfoRouter"));
app.use("/joinapplyInfo",require("./router/joinapplyInfoRouter"));
app.use("/activityInfo",require("./router/activityRouter"));
app.use("/commentInfo",require("./router/comentInfoRouter"));



//全局处理异常了
app.use((err, req, resp, next) => {
    console.log(err);
    let resultJson = new ResultJson(false, "服务器错误", err);
    resp.json(resultJson);
    next();
});

const server = http.createServer(app);
server.listen(8080, "0.0.0.0", () => {
    console.log("服务器启动成功.....");
});