const { Random } = require("mockjs");
const Mock = require("mockjs");

const data = Mock.mock({
    a:Random.cparagraph(),
    b:Random.cparagraph(2), //生成的段落包含2句话
    c:Random.cparagraph(1,3),  //生成的段落包含1到3句话
});

const data1 = Mock.mock({
    a:"@csentence()", //随机生成一个句子
    b:"@csentence(10)",  //随机生成一个含有10个字符的句子
    c:"@csentence(1,3)",  //随机生成含有1-3个字符的句子
});


const data2 = Mock.mock({
    a:"@cword()", //随机生成一个字符
    b:"@cword(10)",  //随机生成10个字符
    c:"@cword(1,3)",  //随机生成1-3个字符
    d:"@cword('零一二三四五六七八九十',1,3)", //从字符串中随机拿1-3个字符
});


const data3 = Mock.mock({
    a:"@ctitle()", //随机生成一个3-7字符的标题
    b:"@ctitle(10)",  //随机生成10个字符的标题
    c:"@ctitle(1,3)",  //随机生成1-3个字符
})


const data4 = Mock.mock({
    a:"@cfirst()", //随机生成一个姓
    b:"@clast()",  //随机生成一个名
    c:"@cname()",  //随机生成一个姓名
})

console.log(data);
console.log(data1);
console.log(data2);
console.log(data3);
console.log(data4);