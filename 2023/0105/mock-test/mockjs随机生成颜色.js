const Mock = require("mockjs");


const data = Mock.mock({
    a:Mock.mock("@color"), //16进制表示的颜色
    b:Mock.mock("@hex()"),  //16进制表示的颜色
    c:Mock.mock("@rgb()"),  //rgb进制表示的颜色
    d:Mock.mock("@rgba()")  //rgb机制表示的颜色
})

console.log(data);