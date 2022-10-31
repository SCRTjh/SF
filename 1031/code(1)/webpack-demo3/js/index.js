import Student from "./Student.js";
import "../css/index.css";
// import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "../scss/index.scss";


let s = new Student("张珊", "女");
s.sayHello();
s.study();


$(function () {
    $("#btn1").click(function () {
        Qmsg.success("你成功了");
    })
})