/**
 * @author 杨标
 * @description roomInfo路由模块
 */
const express = require("express");
const router = express.Router();
const ServiceFactory = require("../factory/ServiceFactory");
const ResultJson = require("../model/ResultJson");
const AppConfig = require("../config/AppConfig");
const path = require("path");
const ExcelUtils = require("../utils/ExcelUtils");

router.get("/getList", async (req, resp) => {
    let roomInfoService = ServiceFactory.createRoomInfoService();
    let roomInfoList = await roomInfoService.getList(req.query);
    let resultJson = new ResultJson(true, "房间信息获取成功", roomInfoList);
    resp.json(resultJson);

});

router.get("/getAllList", async (req, resp) => {
    //我这里也要发能行证，怎么办呢?

    let roomInfoService = ServiceFactory.createRoomInfoService();
    let roomInfoList = await roomInfoService.getAllList();
    let resultJson = new ResultJson(true, "房间信息获取成功", roomInfoList);
    resp.json(resultJson);
    resp.json(resultJson);
})


//http://127.0.0.1:16888/roomInfo/getListByPage
router.get("/getListByPage", async (req, resp) => {

    let roomInfoService = ServiceFactory.createRoomInfoService();
    let pageResult = await roomInfoService.getListByPage(req.query);
    //返回统一的JSON格式
    let resultJson = new ResultJson(true, "获取数据成功", pageResult);
    resp.json(resultJson);

});


router.post("/addRoomInfo", async (req, resp) => {
    // 通过get请示过来的参数在`req.query`里面
    // 通过post请求过来的参数在`req.body`里面

    let roomInfoService = ServiceFactory.createRoomInfoService();
    let result = await roomInfoService.add(req.body);
    let resultJson = new ResultJson(result, result ? "新增成功" : "新增失败");
    resp.json(resultJson);

});


router.get("/deleteById", async (req, resp) => {
    let {id} = req.query;
    // 现在要操作数据库，让数据库根据这个id去删除

    let roomInfoService = ServiceFactory.createRoomInfoService();
    let result = await roomInfoService.deleteById(id);
    let resultJson = new ResultJson(result, result ? "删除成功" : "删除失败");
    resp.json(resultJson);

})


router.get("/findById", async (req, resp) => {
    let {id} = req.query;
    //应该要通过Service操作数据库，从数据库里面查询出相关的数据

    let result = await ServiceFactory.createRoomInfoService().findById(id);
    let resultJson = new ResultJson(Boolean(result), result ? "获取成功" : "获取失败", result);
    resp.json(resultJson);
});

//这里我就要写一个请求，去处理后台传递过来要修改的数据
router.post("/update", async (req, resp) => {
    // 因为是post过来的，所以我们要从req.body里面接收参数
    //现在我们接收到这些参数以后，我们就要修改数据库
    let result = await ServiceFactory.createRoomInfoService().update(req.body);
    let resultJson = new ResultJson(result, result ? "修改成功" : "修改失败");
    resp.json(resultJson);
});

//导出excel的请求操作
router.get("/exportToExcel", async (req, resp) => {
    //接收到这个参数以后，我要将这个参数在数据库当中去查询
    let roomInfoList = await ServiceFactory.createRoomInfoService().getList(req.query);
    //roomInfoList是一个数组，将这个数组的数组转换成excel操作
    let excelFileName = Date.now() + ".xlsx";
    let savePath = path.join(AppConfig.excelDir, excelFileName);
    //现在有数据 ，也有了路径，我们就可以调用刚刚封装好的`ExcelUtils`对象的方法
    ExcelUtils.exportToExcel(roomInfoList, savePath);
    //当这个excel的文件生成好了以后，我们就可以把这个文件下载过去了
    // resp.sendFile(savePath);
    resp.download(savePath, "房间信息.xlsx");
});

module.exports = router;