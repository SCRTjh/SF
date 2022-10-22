/**
 * @author 汤俊豪
 * @description roomInfo路由模块
 */
const express = require("express");
const router = express.Router();
const ServiceFactory = require("../factory/ServiceFactory");



//http://127.0.0.1:16888/roomInfo/getList?ownername=杨标roomname1=1-1-203&telephone=18627387654
router.get("/getList", async (req, resp) => {
    // req.query得到?后面的请求参数，拿到这个参数以后在数据库当中去查询
    try {
        let roomInfoServcie = ServiceFactory.createRoomInfoServcie();
        let roomInfoList = await roomInfoServcie.getList(req.query);
        resp.json(roomInfoList);
    } catch (error) {
        console.log(error);
        console.log("服务器错了")
        resp.send("服务器错了");
    }
});


module.exports = router;