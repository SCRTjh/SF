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
     * 
     * @param {number} id 要删除项的id主键 
     * @returns {Promise<Boolean>}
     */
    async deleteById(id) {
        let strSql = `delete from ${this.currentTableName} where id = ?;`;
        let result = await this.executeSql(strSql, [id]);
        return result.affectedRows > 0;
    }

}

module.exports = BaseService;