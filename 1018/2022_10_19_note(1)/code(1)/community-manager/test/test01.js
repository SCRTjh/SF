/**
 * 我要在这一个文件里面，同时使用三个Service
 */

const RoomInfoService = require("../service/RoomInfoService");
const CostTypeService = require("../service/CostTypeService");
const CostInfoService = require("../service/CostInfoService");

//现在我分别想获取三个数据表里面所有的数据

let roomInfoService = new RoomInfoService();
let costTypeService = new CostTypeService();
let costInfoService = new CostInfoService();

const testGetAllList = async () => {
    try {
        let roomInfoList = await roomInfoService.getAllList();
        let costTypeList = await costTypeService.getAllList();
        let costInfoList = await costInfoService.getAllList();
        console.log(roomInfoList);
        console.log(costTypeList);
        console.log(costInfoList);
    } catch (error) {
        console.log(error);
        console.log("数据库执行失败");
    }
}

testGetAllList();