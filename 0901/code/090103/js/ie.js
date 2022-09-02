/**
 * 2022-09-01
 * YangBiao
 **/

var btn1 = document.getElementById("btn1");
//IE的代码
btn1.attachEvent("onclick",function (event){
    console.log("我是IE里面的事件");
});