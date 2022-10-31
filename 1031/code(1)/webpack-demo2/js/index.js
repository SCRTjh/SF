//我们现在在这里是导入了一个CSS的文件
import "../css/index.css";

import "../scss/index.scss";




//这个文件必须要经过处理以后才可以使用

import Student from "./Student.js";
let s = new Student("张珊", "女");
s.sayHello();
s.study();