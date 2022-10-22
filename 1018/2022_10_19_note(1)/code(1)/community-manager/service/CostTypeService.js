/**
 * 对数据表进行costtype进行操作
 */
const BaseService = require("./BaseService.js");

class CostTypeService extends BaseService {
    // 在new的时候自动执行
    constructor() {
        super("costtype");
    }
    /**
     * 新增
     * @param {{ costname, price, description }} param 数据库的参数 
     * @return {Promise<Boolean>} true代表新增成功,false代表新增失败
     */
    async add({ costname, price, description }) {
        let strSql = `insert into ${this.currentTableName} (costname, price, description) 
        values (?,?,?);`;
        let result = await this.executeSql(strSql, [costname, price, description])
        return result.affectedRows > 0;
    }

    /**
     * 修改费用类别
     * @param {{id, costname, price, description}} param0 参数
     * @returns {Promise<Boolean>} true修改成功，false修改失败
     */
    async update({ id, costname, price, description }) {
        let strSql = `update ${this.currentTableName} set costname = ?,price =?,description = ? where id = ? `;
        let result = await this.executeSql(strSql, [costname, price, description, id])
        return result.affectedRows > 0;
    }
    /**
     * 查询列表
     * @param {{ costname }} param0 查询参数
     * @returns {Promise<Array>}
     */
    async getList({ costname }) {
        let strSql = `select * from ${this.currentTableName} where 1 =1 `;
        let { strWhere, ps } = this.paramsInit().equal(costname, "costname");
        strSql += strWhere;
        let result = await this.executeSql(strSql, ps);
        return result;
    }
}
module.exports = CostTypeService;