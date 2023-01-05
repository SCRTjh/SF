const { Random } = require("mockjs");
const Mock = require("mockjs");


const data = Mock.mock({
    a:Random.region(),  //生成中国大区域
    b:Random.province(), //生成一个省
    c:Random.city(), //生成一个市
    d:Random.city(true),  //生成一个市  包括省份+市
    e:Random.county(),  //生成一个县
    f:Random.county(true),  //生成一个省市县
    g:Random.zip(),  //一个邮编
});

console.log(data);