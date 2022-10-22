/**
 * 我要在这一个文件里面，同时使用三个Service
 */

 const CostTypeService = require("../service/CostTypeService");
 const CostInfoService = require("../service/CostInfoService");
 const AdminInfoService = require("../service/AdminInfoService");
 
 //现在我分别想获取三个数据表里面所有的数据
 
 let costTypeService = new CostTypeService();
 let costInfoService = new CostInfoService();
 let adminInfoService = new AdminInfoService();
 
 const testGetAllList = async () => {
     try {
         let costTypeList = await costTypeService.getAllList();
         let costInfoList = await costInfoService.getAllList();
         let adminInfoList = await adminInfoService.getAllList();
         console.log(costTypeList);
         console.log(costInfoList);
         console.log(adminInfoList);
     } catch (error) {
         console.log(error);
         console.log("数据库执行失败");
     }
 }
 
 testGetAllList();