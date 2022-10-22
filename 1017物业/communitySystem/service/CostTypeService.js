/**
 * 对数据表costtype的操作
 */

// const DBUtils = require("../utils/DBUtils.js");
const BaseService = require("./BaseService.js");

class CostTypeService extends BaseService {
    constructor() {
        super("costtype")
    }

    /**
     * 
     * @param {{costname,price,description}} 数据库的参数 
     * @returns {Promise<Boolean>} true代表新增成功，false代表新增失败
     */
    async add({ costname, price, description }) {
        let strSql = `insert into ${this.currentTableName}(costname,price,description) 
         values (?,?,?);`;
        let result = await this.executeSql(strSql, [costname, price, description]);
        return result.affectedRows > 0;
    }


    update() {
        ;
    }

    getList() {
        ;
    }

}
module.exports = CostTypeService;