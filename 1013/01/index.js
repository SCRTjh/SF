const mysql = require("mysql2");



let conn = mysql.createConnection({
    host: "192.168.106.254",
    port: 3306,
    user: "sg",
    password: "123456",
    database: "h2204"
});


try {
    conn.connect();
    let strSql = "insert into stuinfo(sname,sage,ssex,shobby) values(?,?,?,?)";

    conn.query(strSql, ["汤俊豪", "21", "男", "看动漫"], (error, result) => {
        if (error) {
            console.log(error);
            console.log("插入失败");
        } else {
            console.log(result);
            console.log("插入成功");
        }
    })


    conn.end();
} catch (error) {
    console.log(error);
    console.log("连接失败");
}