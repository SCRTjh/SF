/**
 * @author 杨标
 * @description adminInfo路由模块
 */
const express = require("express");
const router = express.Router();
const ServiceFactory = require("../factory/ServiceFactory");
const ResultJson = require("../model/ResultJson");
const jwt = require("jsonwebtoken");
const AppConfig = require("../config/AppConfig");

router.post("/addAdminInfo", async (req, resp) => {
    //当我们接收到前台传递过来的参数以的,我们就要插入到数据库
    let result = await ServiceFactory.createAdminInfoService().add(req.body);
    let resultJson = new ResultJson(result, result ? "新增成功" : "新增失败");
    resp.json(resultJson);
});

//处理登录的请求
router.post("/checkLogin", async (req, resp) => {
    //拿到用户在前台传递过来的参数以后,我们要进行数据库的校验操作
    let result = await ServiceFactory.createAdminInfoService().checkLogin(req.body);
    if (result) {
        //登录成功
        //颁发令牌
        let token = jwt.sign({
            adminInfo: result
        }, AppConfig.secret, {
            expiresIn: "1h"
        });
        Reflect.deleteProperty(result, "adminpwd");
        //delete result.adminpwd;
        result.token = token;
        let resultJson = new ResultJson(Boolean(result), result ? "登录成功" : "登录失败", result);
        resp.json(resultJson);
    } else {
        //登录失败
    }
})


module.exports = router;