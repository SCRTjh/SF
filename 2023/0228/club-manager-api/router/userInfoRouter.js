const express = require("express");
const router = express.Router();
const ServiceFactory = require('../factory/ServiceFactory');
const ResultJson = require("../model/ResultJson");
const PageResult = require("../model/PageResult");
const JWT= require("jsonwebtoken");
const AppConfig = require("../config/AppConfig");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const upload = multer({
    dest: path.join(__dirname, "../uploadImages/userPhoto"),
})


router.post("/add",async (req,resp)=>{
    let result = await ServiceFactory.createUserInfoService().add(req.body);
    if(result){
        resp.json(new ResultJson(true,"新增成功"));
    }else{
        resp.json(new ResultJson(false,"新增失败"))
    }

});

router.get("/findById/:id",async (req,resp)=>{
    let result = await ServiceFactory.createUserInfoService().findById(req.params.id);
    if(result){
        resp.json(new ResultJson(true,"获取数据成功",result))
    }else{
        resp.json(new ResultJson(false,"获取数据失败",result))
    }
})

router.delete("/deleteById/:id", async (req,resp) => {
    let result = await ServiceFactory.createUserInfoService().deleteById(req.params.id);
    if (result) {
        resp.json(new ResultJson(true, "删除成功"));
    }
    else {
        resp.json(new ResultJson(false, "删除失败"));
    }
});


router.patch("/update/:id",async (req,resp)=>{
    let result = await ServiceFactory.createUserInfoService().update({...req.body,...req.params});
    if (result) {
        resp.json(new ResultJson(true, "修改成功"));
    }
    else {
        resp.json(new ResultJson(false, "修改失败"));
    }
});

router.get("/getAllList", async (req,resp)=>{
    let result = await ServiceFactory.createUserInfoService().getAllList();
    resp.json(new ResultJson(true,"获取数据成功",result));
})


router.get("/getListByPage",async (req,resp)=>{
    let pageResult = await ServiceFactory.createUserInfoService().getListByPage(req.query);
    resp.json(new ResultJson(true,"数据获取成功",pageResult));
})

router.post("/checkLogin",async (req,resp)=>{
    let result = await ServiceFactory.createUserInfoService().checkLogin(req.body);
    if(result){
        let token = JWT.sign({
            ...result,
            type:"admin"
        },AppConfig.secret,{
            expiresIn:"7d"
        });

        resp.json(new ResultJson(true,"登陆成功",{
            token,
            userInfo:result
        }))
    }else{
        //登录失败
        resp.json(new ResultJson(false,"登陆失败，用户名或密码不正确"));
    }
})

router.post("/updateUserPwd",async (req,resp)=>{
    //判断旧密码
    let userInfoService = ServiceFactory.createUserInfoService();
    console.log(req.body);
    let loginResult = await userInfoService.checkLoginById({id:req.body.id,user_pwd:req.body.oldPwd});
    if(loginResult){
        let result = await ServiceFactory.createUserInfoService().updateUserPwd(req.body);
        resp.json(new ResultJson(result,result?"密码修改成功":"密码修改失败"))
    }else{
        resp.json(new ResultJson(false,"原始密码不正确"));
    }
});

router.post("/uploadUserPhoto",upload.single("user_photo"),async (req,resp)=>{
    let file = req.file;
    if(file){
        //有文件
        //组件新文件名，重命名文件
        console.log(file);
        let newFileName = file.filename + file.originalname
        fs.renameSync(file.path,path.join(__dirname,"../uploadImages/userPhoto",newFileName));
        resp.json(new ResultJson(true,"图片上传成功",`/uploadImages/userPhoto/${newFileName}`));
    }else{
        resp.json(new ResultJson(false,"未接受到文件"));
    }
})




module.exports = router;