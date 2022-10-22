/**
 * 测试CostTypeService里面的方法
 */


const CostTypeService = require("../service/CostTypeService.js");

let costTypeService = new CostTypeService();

//测试新增

const testAdd = () => {
    let costType = {
        costname: "标哥的保护费123123",
        price: 100,
        description: "标哥哥自己的保护费用"
    }
    costTypeService.add(costType).then(result => {
        if (result) {
            console.log("新增成功");
        }
        else {
            console.log("新增失败");
        }
    }).catch(error => {
        console.log(error);
        console.log("数据库操作异学");
    });
}

// testAdd();

//测试删除
const testDelete = async () => {
    try {
        let result = await costTypeService.deleteById(145)
        if (result) {
            console.log("删除成功");
        }
        else {
            console.log("删除失败");
        }
    } catch (error) {
        console.log(error);
        console.log("数据库执行失败");
    }
}

// testDelete();


const testGetList = async () => {
    try {
        let obj = {
            costname:"开门费"
        }
        let result = await costTypeService.getList(obj);
        console.log(result);
    } catch (error) {
        console.log(error);
        console.log("数据库执行失败");
    }
}

testGetList();