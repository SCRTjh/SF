const ServiceFactory = require("../factory/ServiceFactory")

/*
ServiceFactory.createRoomInfoServcie().getListByPage({
    pageIndex: 1
}).then(result => {
    let [result1, [{ totalCount }]] = result;
    // console.log(result1);
    // console.log(result2[0].totalCount);
    console.log(totalCount);
}).catch(error => {
    console.log(error);
    console.log("失败了");
})
*/



ServiceFactory.createRoomInfoServcie().getListByPage({
    pageIndex:1
}).then(result=>{
    //result  应该就是  pageResult的对象了
    console.log(result);
}).catch(error=>{
    console.log(error);
    console.log("失败了");
})