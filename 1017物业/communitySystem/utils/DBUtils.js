/**
 * 数据库操作的封装
 * @author 汤俊豪
 */

const mysql = require("mysql2");
const { localDBConfig, remoteDBConfig } = require("../config/DBConfig.js");

class DBUtils {

    /**
     * 获取数据库的连接
     * @returns {mysql.Connection}
     */
    getConn() {
        let conn = mysql.createConnection(remoteDBConfig);
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

    /**
     * 初始化参数方法
     * @returns {{strWhere:string,ps:Array}}
     */
    paramsInit() {
        let obj = {
            strWhere: "",
            ps: [],
            /**
             * 精确查询
             * @param {string|number|any} value 
             * @param {string} name 
             * @returns {obj}
             */
            equal(value, name) {
                if (value) {
                    this.strWhere += ` and ${name} = ? `;
                    this.ps.push(value);
                }
                return this;
            },
            /**
             * 模糊查询
             * @param {string|number|any} value 
             * @param {string} name 
             * @returns {obj}
             */
            like(value, name) {
                if (value) {
                    this.strWhere += ` and ${name} like ? `;
                    this.ps.push(`%${value}%`);
                }
                return this;
            }

        }
        return obj;
    }

}

module.exports = DBUtils;
