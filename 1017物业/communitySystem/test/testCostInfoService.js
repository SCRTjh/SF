const CostInfoService = require("../service/CostInfoService.js");

const costinfoService = new CostInfoService();

const testAdd = async () => {
    let costinfo = {
        roomid: 96,
        costid: 173,
        paytime: "2022-10-17 00:00:00",
        count: 3,
        price: 80,
        totalmoney: 12000,
        paytype: 0

    }
    let result = await costinfoService.add(costinfo);
    if (result) {
        console.log("新增成功");
    } else {
        console.log("新增失败");
    }
}

// testAdd();

const testDelete = async () => {
    let result = await costinfoService.deleteById(5);
    if (result) {
        console.log("删除成功");
    } else {
        console.log("删除失败");
    }
}


const testGetList = async () => {
    let result = await costinfoService.getList2({ ownername: "0" });
    if (result) {
        console.log("查询成功");
        console.log(result);
    } else {
        console.log("查询失败");
    }
}

testGetList();