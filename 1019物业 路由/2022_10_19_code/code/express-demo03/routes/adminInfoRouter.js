const express = require("express");
const router = express.Router();

//http://127.0.0.1:16888/adminInfo/test01?userName=biaogege
router.get("/test01",(req,resp)=>{
    //req代表的就是浏览器到服务器的对象 ，我们可以通过这个东西来获取
    //这个req.query代表的就是get请求的参数，也就是浏览器地址栏里?后面的东西
    console.log(req.query.userName)
    resp.send("我收到你的请求了");
});


module.exports = router;