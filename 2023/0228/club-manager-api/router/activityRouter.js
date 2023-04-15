const express = require("express");
const router = express.Router();
const ServiceFactory = require('../factory/ServiceFactory');
const ResultJson = require("../model/ResultJson");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const upload = multer({
    dest: path.join(__dirname, "../uploadImages/activityImage"),
})


router.post("/add",async (req,resp)=>{
    let result = await ServiceFactory.createActivityInfoService().add(req.body);
    if(result){
        resp.json(new ResultJson(true,"新增成功"));
    }else{
        resp.json(new ResultJson(flase,"新增失败"))
    }
});


router.delete("/deleteById/:id",async (req,resp)=>{
    let result = await ServiceFactory.createActivityInfoService().deleteById(req.params.id);
    resp.json(new ResultJson(result,result?"删除成功":"删除失败"));
})

router.patch("/update/:id",async (req,resp)=>{
    let result = await ServiceFactory.createActivityInfoService().update({...req.body,...req.params});
    resp.json(new ResultJson(result,result?"修改成功":"修改失败"));
});

router.patch("/permit/:id",async (req,resp)=>{
    let result = await ServiceFactory.createActivityInfoService().permitActivity(...req.params.id);
    resp.json(new ResultJson(result,result?"修改成功":"修改失败"));
});

router.patch("/reject/:id",async (req,resp)=>{
    let result = await ServiceFactory.createActivityInfoService().rejectActivity(...req.params.id);
    resp.json(new ResultJson(result,result?"修改成功":"修改失败"));
});

router.get("/getAllList",async (req,resp)=>{
    let result = await ServiceFactory.createActivityInfoService().getAllList();
    resp.json(new ResultJson(true,"获取数据成功",result));
});

router.get("/findById/:id",async (req,resp)=>{
    let result = await ServiceFactory.createActivityInfoService().findById(req.params.id);
    resp.json(new ResultJson(Boolean(result), result ? "获取数据成功" : "获取数据失败", result));
})

router.get("/getListByPage1",async (req,resp)=>{
    let pageResult = await ServiceFactory.createActivityInfoService().getListByPage1(req.query);
    resp.json(new ResultJson(true, "获取数据成功", pageResult));
});

router.get("/getListByPage",async (req,resp)=>{
    let pageResult = await ServiceFactory.createActivityInfoService().getListByPage(req.query);
    resp.json(new ResultJson(true, "获取数据成功", pageResult));
});


router.post("/uploadActivityImage",upload.single("activity_img"),async (req,resp)=>{
    let file = req.file;
    if(file){
        //有文件
        //组件新文件名，重命名文件
        console.log(file);
        let newFileName = file.filename + file.originalname
        fs.renameSync(file.path,path.join(__dirname,"../uploadImages/activityImage",newFileName));
        resp.json(new ResultJson(true,"图片上传成功",`/uploadImages/activityImage/${newFileName}`));
    }else{
        resp.json(new ResultJson(false,"未接受到文件"));
    }
})


module.exports = router;