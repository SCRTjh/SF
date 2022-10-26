/**
 * @author 杨标
 * @description adminInfo路由模块
 */
const express = require("express");
const router = express.Router();
const ServiceFactory = require("../factory/ServiceFactory");
const ResultJson = require("../model/ResultJson");

router.post("/addAdminInfo", async (req, resp) => {
    //当我们接收到前台传递过来的参数以的,我们就要插入到数据库
    let result = await ServiceFactory.createAdminInfoService().add(req.body);
    let resultJson = new ResultJson(result, result ? "新增成功" : "新增失败");
    resp.json(resultJson);
});

module.exports = router;