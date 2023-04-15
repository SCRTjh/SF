const express = require("express");
const router = express.Router();
const ServiceFactory = require('../factory/ServiceFactory');
const ResultJson = require("../model/ResultJson");


router.post("/add",async (req,resp)=>{
    let result = await ServiceFactory.createClubInfoService().add(req.body);
    if(result){
        resp.json(new ResultJson(true,"新增成功"));
    }else{
        resp.json(new ResultJson(false,"新增失败"))
    }
});


router.delete("/deleteById/:id",async (req,resp)=>{
    let result = await ServiceFactory.createClubInfoService().deleteById(req.params.id);
    resp.json(new ResultJson(result,result?"删除成功":"删除失败"));
})

router.patch("/update/:id",async (req,resp)=>{
    let result = await ServiceFactory.createClubInfoService().update({...req.body,...req.params});
    resp.json(new ResultJson(result,result?"修改成功":"修改失败"));
});

router.get("/getAllList",async (req,resp)=>{
    let result = await ServiceFactory.createClubInfoService().getAllList();
    resp.json(new ResultJson(true,"获取数据成功",result));
});

router.get("/findById/:id",async (req,resp)=>{
    let result = await ServiceFactory.createClubInfoService().findById(req.params.id);
    resp.json(new ResultJson(Boolean(result), result ? "获取数据成功" : "获取数据失败", result));
})

router.get("/getListByPage",async (req,resp)=>{
    let pageResult = await ServiceFactory.createClubInfoService().getListByPage(req.query);
    resp.json(new ResultJson(true, "获取数据成功", pageResult));
});



module.exports = router;