const { Random } = require("mockjs");
const Mock = require("mockjs");


const data = Mock.mock({
    a:Random.protocol(), //生成一个协议
    b:Random.domain(), //随机生成一个域名
    c:Random.tld(), //生成顶级域名
    d:Random.email(),  //生成邮箱
    e:Random.email("qq.com"),  //带有何种域名的邮箱
    f:Random.ip(),  //生成ip地址
    g:Random.url(),  //协议+域名
    h:Random.url("https"),  //带有https协议的域名
    i:Random.url("https","www.baidu.com")
});

console.log(data);