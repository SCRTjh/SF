

// 这是使用ESModule导入的
// import teacherInfo from "./a.js";

// 能否使用CommonJs导入...

const teacherInfo = require("./a.js").default;

console.log(teacherInfo);