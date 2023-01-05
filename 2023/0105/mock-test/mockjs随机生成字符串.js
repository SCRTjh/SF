
const Mock = require("mockjs");

const data = Mock.mock({
    // 随机生成一个字符串
    "a":Mock.Random.string(),
    "b":Mock.mock("@string"),  //没有参数 占位符不用加括号
    "c":Mock.mock("@string()"),
    //随机生成一个length 长度的字符串
    "d":Mock.mock("@string(6)"),
    //随机生成一个 都是大写字母 长度为8位的字符串
    "e":Mock.mock("@string(upper,8)"),
    //获取指定长度范围的字符串
    "f":Mock.mock("@string(4,6)"),
    //获取都是小写字母 指定长度范围的字符串
    "g":Mock.mock("@string(lower,4,6)"),
});

console.log(data);