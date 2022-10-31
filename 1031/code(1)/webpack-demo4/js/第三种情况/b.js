// import { userName, sex,sayHello } from "./a.js";

// console.log(userName);
// console.log(sex);

// sayHello();

// import { userName, sex, age, sayHello } from "./a.js";
// 如果要是左边导出了100个变量呢，我们想全部拿到这个变量，怎么办呢？

import * as obj from "./a.js";
//它会导入a.js里面所有的export的东西，然后集合成一个obj的对象

console.log(obj.userName);
console.log(obj.sex);
console.log(obj.age);
obj.sayHello();




