// import obj from "./a.js";
// console.log(obj.sex);
// console.log(obj.userName);


//在导入的时候直接解构是报错的
// import {userName,sex} from "./a.js";

import obj from "./a.js";
const { userName, sex } = obj;

console.log(userName);
console.log(sex);