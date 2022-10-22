/**
 * 数据库操作的封装
 * @author 汤俊豪
 */

const mysql = require("mysql2");

class DBUtils {

    /**
     * 获取数据库的连接
     * @returns {mysql.Connection}
     */
    getConn() {
        let conn = mysql.createConnection({
            host: "192.168.106.254",
            port: 3306,
            user: "sg",
            password: "",
            database: "h2204"
        });
        conn.connect();
        return conn
    }

    /**
     * 
     * @param {string} strSql 要执行的SQL语句
     * @param {Array} params SQL语句里面的参数
     * @returns {Promise<Array>} 返回一个Promise的执行结果
     */
    executeSql(strSql, params = []) {
        return new Promise((resolve, reject) => {
            let conn = this.getConn(); //获取数据库连接
            conn.query(strSql, params, (error, result) => {
                if (error) {
                    reject(error);  //失败reject返回错误
                } else {
                    resolve(result); //成功resolve返回结果
                }
                conn.end(); //关闭数据库连接
            });
        });
    }

}

module.exports = DBUtils;
