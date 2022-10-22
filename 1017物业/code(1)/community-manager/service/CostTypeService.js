/**
 * 对数据表进行costtype进行操作
 */
const BaseService = require("./BaseService.js");

class CostTypeService extends BaseService {
    // 在new的时候自动执行
    constructor(){
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
   
    update(){
        
    }
    getList(){
        
    }
}
module.exports = CostTypeService;