const mysql = require("mysql");
const path = require("path");
const fs = require("fs");
const xlsx = require("node-xlsx");




let conn = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "hello",
    password: "",
    database: "h2204"
});

try {
    conn.connect();
    let strSql = "select * from stuinfo";
    conn.query(strSql, (error, result) => {
        if (error) {
            console.log(error);
            console.log("数据库执行失败");
        } else {
            // console.log(result);
            console.log("数据库执行成功");
            //生成.xlsx文件
            let excelObj = {
                name: "sheet1",
                data: []
            }

            let firstRow = Object.keys(result[0]);
            excelObj.data.push(firstRow);

            for (let item of result) {
                excelObj.data.push(Object.values(item));
            }

            let excelSavePath = path.join(__dirname, "./data.xlsx");

            let excelBuff = xlsx.build([excelObj]);

            fs.writeFileSync(excelSavePath, excelBuff);
            console.log("生成成功");
        }
    })

    conn.end()
} catch (error) {
    console.log(error);
    console.log("数据库连接失败");
}

