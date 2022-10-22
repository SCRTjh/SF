/**
 * 
 * @author 汤俊豪
 * @desc roomInfo路由模块
 */

const express = require("express");
const router = express.Router();
const ServiceFactory = require("../factory/ServiceFactory");
const ResultJson = require("../model/ResultJson");


router.get("/getList", async (req, resp) => {
    console.log(req.originalUrl);
    console.log(req.query);
    try {
        let roomInfoService = ServiceFactory.createRoomInfoService();
        let roomInfoList = await roomInfoService.getList(req.query);
        let resultJson = new ResultJson(true, "房间信息获取成功", roomInfoList);
        resp.json(resultJson);
    } catch (error) {
        let resultJson = new ResultJson(false, "服务器错误");
        console.log(error);
        resp.json(resultJson);
    }


});

router.get("/getAllList", async (req, resp) => {
    try {
        let roomInfoService = ServiceFactory.createRoomInfoService();
        let roomInfoList = await roomInfoService.getAllList();
        let resultJson = new ResultJson(true, "房间信息获取成功", roomInfoList);
        resp.json(resultJson);
    } catch (error) {
        let resultJson = new ResultJson(false, "服务器错误");
        resp.json(resultJson);
    }
})



module.exports = router;