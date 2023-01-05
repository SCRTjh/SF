
const Mock = require("mockjs");

const data = Mock.mock({
    //随机获取一个图片
    a:Mock.mock("@image()"),
    b:Mock.mock("@image(300x600,#ff0,#00f,Hello)"),
    c:Mock.mock("@image(300x600,#ff0,#00f,gif,Hello)"),
});

console.log(data);