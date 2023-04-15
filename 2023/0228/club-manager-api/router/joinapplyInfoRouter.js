const express = require("express");
const router = express.Router();
const ServiceFactory = require("../factory/ServiceFactory");
const ResultJson = require("../model/ResultJson");


router.post("/add",async (req,resp) => {
    let result = await ServiceFactory.createJoinapplyInfoService().add(req.body);
    if(result){
        resp.json(new ResultJson(true,"新增成功"));
    }else{
        resp.json(new ResultJson(false,"新增失败"));
    }
});

router.delete("/deleteById/:id",async (req,resp)=>{
    let result = await ServiceFactory.createJoinapplyInfoService().deleteById(req.params.id);
    resp.json(new ResultJson(Boolean(result), result ? "获取数据成功" : "获取数据失败", result));
});

router.patch("/permit/:id",async (req,resp)=>{
    let result = await ServiceFactory.createJoinapplyInfoService().permitUpdate(req.params.id);
    if(result){
        resp.json(new ResultJson(true,"修改成功"));
    }else{
        resp.json(new ResultJson(false,"修改失败"));
    }
});

router.patch("/reject/:id",async (req,resp)=>{
    let result = await ServiceFactory.createJoinapplyInfoService().rejectUpdate(req.params.id);
    if(result){
        resp.json(new ResultJson(true,"修改成功"))
    }else{
        resp.json(new ResultJson(false,"修改失败"));
    }
});

router.get("/checkApply/:id",async (req,resp)=>{
    let result = await ServiceFactory.createJoinapplyInfoService().checkApply(req.params.id);
    resp.json(new ResultJson(true,"检测数据成功",Boolean(result.length)));
})

router.get("/getAllList",async (req,resp)=>{
    let result = await ServiceFactory.createJoinapplyInfoService().getAllInfoList();
    resp.json(new ResultJson(true,"获取数据成功",result));
});

router.get("/getListByPage",async (req,resp)=>{
    let pageResult = await ServiceFactory.createJoinapplyInfoService().getListByPage(req.query);
    resp.json(new ResultJson(true,"数据获取成功",pageResult));
});




module.exports = router;
