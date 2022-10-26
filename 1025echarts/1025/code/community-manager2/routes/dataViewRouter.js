/**
 * @author 杨标
 * @description dataView的路由模块
 */
const express = require("express");
const router = express.Router();
const ServiceFactory = require("../factory/ServiceFactory");
const ResultJson = require("../model/ResultJson");

router.get("/getCalcData", async (req, resp) => {
    let result = await ServiceFactory.createDataViewService().getCalcData();
    let resultJson = new ResultJson(Boolean(result), result ? "获取数据成功" : "获取数据失败", result);
    resp.json(resultJson);
});

router.get("/getCostTypeTotalMoney",async(req,resp)=>{
    let result = await ServiceFactory.createDataViewService().getCostTypeTotalMoney();
    let resultJson = new ResultJson(true,"获取数据成功",result);
    resp.json(resultJson);
})


module.exports = router;