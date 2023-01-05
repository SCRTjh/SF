

const Mock = require("mockjs");

const data = Mock.mock({
    //获取长度为10 的数组  数组元素从0开始  元素每次自增1
    "a":Mock.mock("@range(10)"),
    //获取里面元素是5到10 的数组
    "b":Mock.mock("@range(5,11)"),
    // 5 8
    "c":Mock.mock("@range(5,11,3)")
});


console.log(data);