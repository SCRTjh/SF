/**
 * @author 汤俊豪
 * @date 2022-10-21
 * @desc mysql数据操作的相关内容
 */
const mysql = require("mysql2");

const { localDBConfig, remoteDBConfig } = require("../config/DBConfig");

class DBUtils {

    /**
     * 获取数据库连接
     * @returns {mysql.Connection} 获取的数据库连接
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

    paramsInit() {

        let obj = {

            strWhere: "",  //要拼接的条件语句
            ps: [],  //?参数

            /**
             * 精确查询
             * @param {string|number|boolean} value 
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
                if (value, name) {
                    if (value) {
                        this.strWhere += ` and ${name} like ? `;
                        this.ps.push(`%${value}%`);
                    }
                    return this;
                }
            }

        }
        return obj;
    }


}

module.exports = DBUtils;