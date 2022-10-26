/**
 * @author 杨标
 * @description 所有Servcie的基础类
 * @date 2022-10-19
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
            admininfo: "admininfo"
        }
    }

    /**
     * 根据id删除一项
     * @warn 后期这里要改成软删除【逻辑删除】
     * @param {number} id 
     * @returns {Promise<boolean>} true删除成功，false删除失败
     */
    async deleteById(id) {
        //  let strSql = `delete from ${this.currentTableName} where id  = ? `;
        // 这个时候原本真正的删除语句就变在修改语句`update`
        let strSql = ` update ${this.currentTableName} set isDel = true where id = ? `;
        let result = await this.executeSql(strSql, [id]);
        return result.affectedRows > 0;
    }

    /**
     * 获取所有数据
     * @returns {Promise<Array>}
     */
    async getAllList() {
        let strSql = ` select * from ${this.currentTableName} where isDel = false `;
        let result = await this.executeSql(strSql);
        return result;
    }


    /**
     * 根据id去查询
     * @param {number} id 主键id 
     * @returns {Promise<Object|undefined>}
     */
    async findById(id) {
        let strSql = ` select * from ${this.currentTableName} where isDel = false and id = ? `;
        let result = await this.executeSql(strSql, [id]);
        return result[0];
    }
}

module.exports = BaseService;