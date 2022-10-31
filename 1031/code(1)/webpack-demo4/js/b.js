//这是原本的CommonJs导入
// const { userName, sex } = require("./a.js");
// console.log(userName, sex);


// import obj from "./a.js";
// console.log(obj.userName);
// console.log(obj.sex);


//这里的解构又是可以的
import { userName, sex } from "./a";
console.log(userName);
console.log(sex);