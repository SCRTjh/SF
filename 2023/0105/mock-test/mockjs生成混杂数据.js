const { Random } = require("mockjs");
const Mock = require("mockjs");

const data = Mock.mock({
    a:Random.guid(),  // 生成一串uuid
    b:Random.id(),  //生成身份证号
});

console.log(data);