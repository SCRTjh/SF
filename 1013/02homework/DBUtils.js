/**
 * 数据库工具类
 * @author tjh
 */
const mysql = require("mysql2");

class DBUtils {

    /**
     * 获取一个数据库连接
     * @returns {mysql.Connection}
     */
    getConn() {
        let conn = mysql.createConnection({
            host: "127.0.0.1",
            port: 3306,
            user: "root",
            password: "",
            database: "h2204"
        });
        conn.connect();
        return conn;
    }
    /**
     * 
     * @param {String} strSql sql语句
     * @param {Array} params sql数据参数
     * @returns {Promise<Arraay>|mysql.ResultSetHeader} 返回一个promise结果
     */
    executeSql(strSql, params = []) {
        return new Promise((resolve, reject) => {
            let conn = this.getConn();
            conn.query(strSql, params, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
                conn.end();
                console.log("关闭连接");

            });
        });
    }

}

module.exports = DBUtils;