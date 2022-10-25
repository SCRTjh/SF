/**
 * @author 汤俊豪
 * @date 2022-10-23
 * @desc roomInfo路由模块
 */

const express = require("express");
const router = express.Router();
const ServiceFactory = require("../factory/ServiceFactory");
const ResultJson = require("../model/ResultJson");

router.get("/getList", async (req, resp) => {
    try {
        let roomInfoService = ServiceFactory.createRoomInfoService();
        let roomInfoList = await roomInfoService.getList(req.query);
        let resultJson = new ResultJson(true, "房间信息获取成功", roomInfoList)
        resp.json(resultJson);
    } catch (error) {
        let resultJson = new ResultJson(false, "服务器错误")
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


router.get("/getListByPage", async (req, resp) => {
    try {
        let roomInfoService = ServiceFactory.createRoomInfoService();
        let pageResult = await roomInfoService.getListByPage(req.query);
        let resultJson = new ResultJson(true, "获取数据成功", pageResult);
        resp.json(resultJson);
    } catch (error) {
        console.log(error);
        let resultJson = new ResultJson(false, "服务器错误");
        resp.json(resultJson);
    }
})

router.post("/addRoomInfo", async (req, resp) => {
    //post参数再req.body里面
    try {
        let roomInfoService = ServiceFactory.createRoomInfoService();
        let result = await roomInfoService.add(req, body);
        let resultJson = new ResultJson(result, result ? "新增成功" : "新增失败");
        resp.json(resultJson);
    } catch (error) {
        let resultJson = new ResultJson(false, "服务器错误");
        resp.json(resultJson);
    }
})

router.get("/deleteById", async (req, resp) => {
    let { id } = req.query;
    // 现在要操作数据库，让数据库根据这个id去删除
    try {
        let roomInfoService = ServiceFactory.createRoomInfoService();
        let result = await roomInfoService.deleteById(id);
        console.log(result);
        let resultJson = new ResultJson(result, result ? "删除成功" : "删除失败");
        resp.json(resultJson);
    } catch (error) {
        console.log(error);
        let resultJson = new ResultJson(false, "服务器错误");
        resp.json(resultJson);
    }
})


module.exports = router;