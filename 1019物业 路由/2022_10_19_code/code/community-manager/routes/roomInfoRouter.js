/**
 * @author 杨标
 * @description roomInfo路由模块
 */
const express = require("express");
const router = express.Router();
const ServiceFactory = require("../factory/ServiceFactory");



//http://127.0.0.1:16888/roomInfo/getList?ownername=杨标roomname1=1-1-203&telephone=18627387654
router.get("/getList", async (req, resp) => {
    // req.query就会得到?后面的请求参数，我们拿到这个参数以后要在数据库当中去查询
    /**
     * req.query应该就是下面的对象
     * {
     *     ownername:"杨标",
     *     roomname:"1-1-203",
     *     telephone:18627387654
     * }
     */
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