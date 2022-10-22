const AdminInfoService = require("../service/AdminInfoService.js");

const admininfoService = new AdminInfoService();

const testAdd = async () => {
    let admininfo = {
        adminname: "汤俊豪",
        adminpwd: "123456",
        adminemail: "1212121@qq.com",
        admintel: '15172227901',
        adminstatus: 0
    }
    let result = await admininfoService.add(admininfo);
    if (result) {
        console.log("新增成功");
    } else {
        console.log("新增失败");
    }
}

testAdd();

const testDelete = async () => {
    let result = await admininfoService.deleteById(5);
    if (result) {
        console.log("删除成功");
    } else {
        console.log("删除失败");
    }
}