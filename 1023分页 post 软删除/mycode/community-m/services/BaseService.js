/**
 * @author 汤俊豪
 * @date 2022-10-23
 * @desc 所有Service的基类
 */

const DBUtils = require("../utils/DBUtils");
class BaseService extends DBUtils {
    constructor(currentTableName) {
        super();
        this.currentTableName = currentTableName;
        this.tableMap = {
            roominfo: "roominfo",
            costinfo: "costinfo",
            costtype: "costtype",
            admininfo: "admininfo",
        }
    }
    /**
     * 根据id删除一项
     * @param {number} id 
     * @returns {Promise<boolean>} true删除成功 false失败
     */
    async deleteById(id) {
        //软删除
        let strSql = ` update ${this.currentTableName} set isDel = true where id = ? `;
        let result = await this.executeSql(strSql, [id]);
        console.log(result);
        return result.affectedRows > 0;
    }

    async getAllList() {
        let strSql = `select * from ${this.currentTableName} where 1=1 isDel = false `;
        let result = await this.executeSql(strSql);
        return result;
    }


}

module.exports = BaseService;