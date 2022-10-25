/**
 * @author 杨标
 * @description costType路由模块
 */
const express = require("express");
const router = express.Router();
const ServiceFactory = require("../factory/ServiceFactory");
const ResultJson = require("../model/ResultJson");


router.get("/getListByPage", async (req, resp) => {

    let costTypeService = ServiceFactory.createCostTypeService();
    let pageResult = await costTypeService.getListByPage(req.query);
    //返回统一的JSON格式
    let resultJson = new ResultJson(true, "获取数据成功", pageResult);
    resp.json(resultJson);

});

router.post("/addCostType", async (req, resp) => {
    // 通过get请示过来的参数在`req.query`里面
    // 通过post请求过来的参数在`req.body`里面

    let costTypeService = ServiceFactory.createCostTypeService();
    let result = await costTypeService.add(req.body);
    let resultJson = new ResultJson(result, result ? "新增成功" : "新增失败");
    resp.json(resultJson);

});


module.exports = router;