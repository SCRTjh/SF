
const Mock = require("mockjs");

const data = Mock.mock({
    //随机获取一个时间
    "a":Mock.Random.date(),
    //随机获取一个格式化的时间
    "b":Mock.Random.date("yyyy/MM/dd HH:mm:ss")
});

console.log(data);