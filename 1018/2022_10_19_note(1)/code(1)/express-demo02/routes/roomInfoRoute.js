/**
 * 路由本身其实就是一个小型的app.js
 * 只处理关于`roomInfo`表的操作的
 */
const express = require("express");
const router = express.Router();


router.get("/getAllList",(req,resp)=>{
    resp.send("我收到你的getAllList的请求了");
    //后续是不是可以拿到ServiceFactory来操作数据库
})


module.exports = router;