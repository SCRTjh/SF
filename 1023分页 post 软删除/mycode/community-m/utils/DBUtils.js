/**
 * 
 * @author 汤俊豪
 * @Date 2022-10-23
 * @desc mysql数据操作的相关内容
 */

const mysql = require("mysql2");
const { localDBConfig, remoteDBConfig } = require("../config/DBConfig");

class DBUtils {

    /**
     * 获取数据库连接
     * @returns {mysql.Connection} 获取的是数据库连接
     */
    getConn() {
        let conn = mysql.createConnection(localDBConfig);
        conn.connect();
        return conn;
    }

    /**
     * 
     * @param {string} strSql 要执行的SQL语句
     * @param {Array} params SQL语句里面的参数
     * @returns {Promise<Array>|mysql.ResultSetHeader} 返回承诺
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
            });
        });
    }
    /**
     * 初始化参数的方法
     * @returns {object}
     */
    paramsInit() {
        let obj = {
            strWhere: "",
            ps: [],
            /**
             * 
             * @param {string|number|boolean} value 
             * @param {string} name 
             * @returns {Object}
             */
            equal(value, name) {
                if (value) {
                    this.strWhere += ` and ${name} = ? `;
                    this.ps.push(value);
                }
                return this;
            },
            /**
             * 
             * @param {string|number|boolean} value 
             * @param {string} name 
             * @returns {Object} 
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
