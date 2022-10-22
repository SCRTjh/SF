const CostTypeService = require("../service/CostTypeService.js");

const costtypeService = new CostTypeService();

const testAdd = async () => {
    let costtype = {
        costname: "网费",
        price: 80,
        description: "交网费辣"
    }
    let result = await costtypeService.add(costtype);
    if (result) {
        console.log("新增成功");
    } else {
        console.log("新增失败");
    }
}

testAdd();

const testDelete = async () => {
    let result = await costtypeService.deleteById(5);
    if (result) {
        console.log("删除成功");
    } else {
        console.log("删除失败");
    }
}