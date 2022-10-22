const CostInfoService = require("../service/CostInfoService");


//小写的变量，大写的对象
let costInfoService = new CostInfoService();

const testGetList = async () => {
    try {
        let obj = {
            // ownername: "吕亚宇",
            // roomid: 58,
            // costid: 167
        }
        let result = await costInfoService.getList(obj);
        console.log(result);
    } catch (error) {
        console.log(error);
        console.log("服务器出错了");
    }
}

testGetList();