const express = require("express");
const router = express.Router();
const ServiceFactory = require("../factory/ServiceFactory");
const ResultJson = require("../model/ResultJson");

router.get("/getCalcCount",async(req,resp)=>{
    let result = await ServiceFactory.createDataViewService().getCalcData();
    resp.json(new ResultJson(true,"获取数据成功",result));
})

router.get("/getClubTotalCount",async(req,resp)=>{
    let result = await ServiceFactory.createDataViewService().getClubTotalCount();
    resp.json(new ResultJson(true,"获取数据成功",result));
})

router.get("/getActivityTotalCount",async(req,resp)=>{
    let result = await ServiceFactory.createDataViewService().getActivityTotalCount();
    resp.json(new ResultJson(true,"获取数据成功",result));
})



module.exports = router;