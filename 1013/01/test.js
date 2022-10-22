const DBUtils = require("./DBUtils.js");

let dbu = new DBUtils();
let conn = dbu.getConn();

let str = "delete from stuinfo where sname='汤俊豪';";

let test = async () => {
    try {
        let result = await dbu.executeSql(str);
        console.log("成功");
        console.log(result);
    } catch (error) {
        console.log(error);
        console.log("失败");
    }
}

test();

console.log(dbu);



