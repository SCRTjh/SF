const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/getAllList", (req, resp) => {
    resp.send("我收到你的请求了")
});
router.get("/test01", (req, resp) => {
    resp.send(`<input type="text" placeholder="请输入内容" />
    <h2>这是一个2号的标题</h2>`);
});

router.get("/test02", (req, resp) => {
    let obj = {
        userName: "张三",
        sex: "男",
        age: 19
    }
    //如果现在想把这个东西以json字符串形式返回 ，怎么办呢
    //第一步：把它转换成json字符串
    let jsonStr = JSON.stringify(obj);
    //第二步：以文本的形式发送出去
    resp.send(jsonStr);
});

router.get("/test03", (req, resp) => {
    let stuInfo = {
        stuName: "标哥哥",
        sex: "男",
        age: 20
    }
    //我现在就想把上面的对象以json字符串的形式去返回
    resp.json(stuInfo);
    //上面的这一行代码就相当于之前的二步操作
});

//http://127.0.0.1:16888/roomInfo/downloadTest
router.get("/downloadTest", (req, resp) => {
    resp.sendFile(path.join(__dirname, "../css重点单词汇总.zip"));
})


module.exports = router;