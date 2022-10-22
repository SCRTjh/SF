/**
 * 所有Service的基类
 */

const DBUtils = require("../utils/DBUtils.js");

class BaseService extends DBUtils {
    constructor(currentTableName) {
        super();
        this.currentTableName = currentTableName;
    }
    /**
     * 根据id删除某一项数据
     * @param {number} id 要删除项的id主键 
     * @returns {Promise<boolean>} true代表成功，false代表失败
     */
    async deleteById(id) {
        let strSql = `delete from ${this.currentTableName} where id = ?`;
        let result = await this.executeSql(strSql, [id]);
        return result.affectedRows > 0;
    }
    /**
     * 获取所有记录
     * @returns {Promise<Array>}
     */
    async getAllList() {
        let strSql = `select * from ${this.currentTableName} ;`;
        let result = await this.executeSql(strSql);
        return result;
    }
}

module.exports = BaseService;