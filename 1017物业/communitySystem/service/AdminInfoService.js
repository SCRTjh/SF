/**
 * 对数据表costinfo的操作
 */

// const DBUtils = require("../utils/DBUtils.js");
const BaseService = require("./BaseService.js");

class AdminInfoService extends BaseService {
    constructor() {
        super("admininfo")
    }

    /**
     * 
     * @param {{costname,price,description}} 数据库的参数 
     * @returns {Promise<Boolean>} true代表新增成功，false代表新增失败
     */
    async add({ adminname, adminpwd, adminemail, admintel, adminstatus }) {
        let strSql = `insert into ${this.currentTableName}(adminname,adminpwd,adminemail,admintel,adminstatus) 
         values (?,?,?,?,?);`;
        let result = await this.executeSql(strSql, [adminname, adminpwd, adminemail, admintel, adminstatus]);
        return result.affectedRows > 0;
    }


    update() {
        ;
    }

    getList() {
        ;
    }

}
module.exports = AdminInfoService;