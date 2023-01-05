const { Random } = require("mockjs");
const Mock = require("mockjs");

const data = Mock.mock({
    a:Random.capitalize("hello"),  // 首字母大写
    b:Random.upper("aNaCDbbN"),  //全部转为大写
    c:Random.lower("aNaCDbbN"),  //全部转为小写
    d:Random.pick(['小明','小程','寒梅','吉姆']),  //从数组中随机获取一个元素
    e:Random.shuffle(['小明','小程','寒梅','吉姆']),   //打乱数组顺序
});

console.log(data);