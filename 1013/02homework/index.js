const xlsx = require("node-xlsx").default;
const DBUtils = require("./DBUtils.js");
const path = require("path");

/**
 * 读取excel文件
 */
const readExcel = () => {
    //构建excel文件的路径
    let excelPath = path.join(__dirname, "./data.xlsx");
    //第一个工作表
    let [result] = xlsx.parse(excelPath);  //解构
    let keys = result.data.shift(); //取第一行键名
    let dbu = new DBUtils();

    let str = `insert into movieinfo(${Object.values(keys)}) values(?,?,?,?);`;
    for (let item of result.data) {  //遍历剩下的数据
        //将数据插入到数据库
        dbu.executeSql(str, item).then(result => {
            console.log("插入数据成功");
            console.log(result);
        }).catch(error => {
            console.log("插入数据失败");
            console.log(error);
        });

    }

}

readExcel();
