/**
 * mock随机生成简单的数据类型 数据
 */

const Mock = require("mockjs");

console.log("=============随机生成字符串===========");

const data = Mock.mock({
    "a":"#",    //返回1个#
    "b|3":"#",  //返回3个#
    "c|1-3":"#"  //返回1-3个#
});

console.log(data);

console.log("=============随机生成数字===========");

const data1 = Mock.mock({
    "a":1,    //返回1个1
    "b|1-100":1,  //返回1-100的数字
});

console.log(data1);

console.log("=============随机生成布尔类型===========");

const data2 = Mock.mock({
    "a":true,    //返回1个true
    "b|1-2":true,  //返回true或false
});

console.log(data2);

console.log("=============随机生成对象===========");

const cities = {
    "bj":"北京",
    "sh":"上海",
    "gz":"广州",
    "sz":"深圳",
    "xm":"厦门"
}

const data3 = Mock.mock({
    "a|3":cities,    //随机返回3个键值对
    "b|1-4":cities,  //随机返回1-4个键值对
});

console.log(data3);

console.log("=============随机生成数组===========");

const arr = ['北京','上海','广州','深圳'];

const data4 = Mock.mock({
    "a|3":["北京"],    //生成一个有三个元素的数组
    "b|2-4":["北京"],  //生成一个2-4给元素的数组
    "c|2":arr,  //生成一个将 原数组拷贝一次后并合并成一个的 数组
    "d|2-4":arr     //生成一个将 原数组拷贝成2-4倍合并的 数组
});

console.log(data4);
