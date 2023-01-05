/**
 * mockjs 的使用
 * 1.安装mockjs
 * npm i mockjs --save
 * 2.文件中导入mockjs 返回一个mock对象
 * 3.mock对象有一个mock函数 mock 回根据我们别写的模板自动生成模拟数据
 */

const Mock = require("mockjs")

// console.log(Mock);

const data = Mock.mock({
    // 生成的随机数组中包含5-10个元素
    "list|5-10":[
        // 数组中的元素是一个对象
        {"id|+1":1} //从1开始自增1
    ]
})



console.log(data);