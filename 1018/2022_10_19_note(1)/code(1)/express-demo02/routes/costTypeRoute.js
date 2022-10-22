/**
 * 路由本身其实就是一个小型的app.js
 * 这个路由文件只处理关于`costType`的操作的
 */
 const express = require("express");
 const router = express.Router();
 
 
 //http://127.0.0.1:16888/costType/getAllList
 router.get("/getAllList",(req,resp)=>{
    resp.send("这是costType下面的getAllList")
 })
 
 module.exports = router;