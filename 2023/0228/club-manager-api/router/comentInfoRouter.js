const express = require("express");
const router = express.Router();
const ServiceFactory = require("../factory/ServiceFactory");
const ResultJson = require("../model/ResultJson");

router.post("/add",async (req,resp)=>{
    let result = await ServiceFactory.createCommentInfoService().add(req.body);
    if(result){
        resp.json(new ResultJson(true,"添加数据成功"));
    }else{
        resp.json(new ResultJson(false,"添加数据失败"));
    }
})

router.patch("/update/:id", async (req, resp) => {
    let result = await ServiceFactory.createCommentInfoService().update({ ...req.body, ...req.params });
    resp.json(new ResultJson(result, result ? "更新成功" : "更新失败"));
});

router.get("/getAllList", async (req, resp) => {
    let result = await ServiceFactory.createCommentInfoService().getAllList();
    resp.json(new ResultJson(true, "获取数据成功", result));
});

router.get("/getListByPage", async (req, resp) => {
    let pageResult = await ServiceFactory.createCommentInfoService().getListByPage(req.query);
    resp.json(new ResultJson(true, "获取数据成功", pageResult));
});

router.get("/findById/:id", async (req, resp) => {
    let result = await ServiceFactory.createCommentInfoService().findById(req.params.id);
    resp.json(new ResultJson(Boolean(result), result ? "获取数据成功" : "获取数据失败", result));
});



router.delete("/deleteById/:id",async (req,resp)=>{
    let result = await ServiceFactory.createCommentInfoService().deleteById(req.params.id);
    resp.json(new ResultJson(result,result?"删除成功":"删除失败"));
})


module.exports = router;