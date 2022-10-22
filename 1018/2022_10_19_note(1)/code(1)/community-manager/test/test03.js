/**
 * 测试一下ServiceFactory
 */

const ServiceFactory = require("../factory/ServiceFactory");


// 想得到所有的管理员列表
const testAdmin = async () => {
    try {
        let adminInfoService = ServiceFactory.createAdminInfoService();
        let adminInfoList = await adminInfoService.getAllList();
        console.log(adminInfoList);
    } catch (error) {
        console.log(error);
        console.log("服务器错误");
    }
}
// testAdmin();
/*
ServiceFactory.createAdminInfoService().getAllList().then(adminInfoList => {
    console.log(adminInfoList);
}).catch(error=>{
    console.log(error);
    console.log("服务器错误");
});

ServiceFactory.createRoomInfoService().getAllList().then(roomInfoList=>{
    console.log(roomInfoList);
}).catch(error=>{
    console.log(error);
    console.log("服务器错误");
})
*/


const testAddCostType = async () => {
    let obj = {
        costname: "标哥的小费",
        price: 18,
        description: "测试标哥的小费添加"
    }
    try {
        let result = await ServiceFactory.createCostTypeService().add(obj);
        if (result) {
            console.log("新增成功");
        }
        else {
            console.log("新增失败");
        }
    } catch (error) {
        console.log(error);
        console.log("服务器错误");
    }
}

testAddCostType();


/*
ServiceFactory.createCostTypeService().add(obj).then(result=>{
    if(result){
        console.log("新增成功");
    }
    else{
        console.log("新增失败");
    }
}).catch(error=>{
    console.log(error);
    console.log("服务器错误");
})
*/




