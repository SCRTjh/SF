const RoomInfoService = require("../service/RoomInfoService.js");

const roominfoService = new RoomInfoService();

const testAdd = async () => {
    let roominfo = {
        roomname: "1-1-108",
        roomarea: 100,
        ownername: "汤俊豪",
        ownersex: "男",
        IDCard: "420902200100000000",
        telephone: 1517227901,
        email: "1277662732@qq.com",
        roomstatus: 0
    }
    let result = await roominfoService.add(roominfo);
    if (result) {
        console.log("新增成功");
    } else {
        console.log("新增失败");
    }
}

// testAdd();

const testDelete = async () => {
    let result = await roominfoService.deleteById(5);
    if (result) {
        console.log("删除成功");
    } else {
        console.log("删除失败");
    }
}

const testGetList = async () => {
    let result = await roominfoService.getList2({ ownername: "汤" });
    if (result) {
        console.log("查询成功");
        console.log(result);
    } else {
        console.log("查询失败");
    }
}

testGetList();