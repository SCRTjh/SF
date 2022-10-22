/**
 * 因为还没有学到单元测试,我们现在先在这里进行测试
 */

const RoomInfoService = require("../service/RoomInfoService.js");

//请注意,这里有一个命名规范的问题,小写的变量,大写的对象
const roominfoService = new RoomInfoService()

const testAdd = async () => {
    // 设置一个要新增的对象
    let roomInfo = {
        roomname: "1-1-101",
        roomarea: 100,
        ownername: "杨标",
        onersex: "男",
        IDCard: "420999199909081716",
        telephone: "18726374678",
        email: "333@abc.com",
        roomstatus: 0
    }
    let result = await roominfoService.add(roomInfo);
    if (result) {
        console.log("新增成功");
    }
    else {
        console.log("新增失败");
    }
}

// testAdd();

//测试删除
const testDelete = async () => {
    let result = await roominfoService.deleteById(5);
    if (result) {
        console.log("删除成功");
    }
    else {
        console.log("删除失败");
    }

}
// testDelete();


// 测试查询
const testQuery = async () => {
    let obj = {
        roomname: "203"
    }
    try {
        let result = await roominfoService.getList(obj);
        console.log(result);
    } catch (error) {
        console.log(error);
        console.log("数据库出错了");
    }
}
// testQuery();



const testGetList2 = async () => {
    let roomInfo = {
        roomname: "203",
        ownername: "曹",
        // telephone: "13467829876"
    }
    try {
        let result = await roominfoService.getList2(roomInfo);
        console.log(result);
    } catch (error) {
        console.log(error);
        console.log("数据库执行失败");
    }

}

testGetList2();