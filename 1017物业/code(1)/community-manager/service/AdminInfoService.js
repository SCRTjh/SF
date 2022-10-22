/**
 * admininfo数据表的操作
 */

// 在ESModule的时候，我们的文件里面的.js是不能省略的
// 但是在CommonJS里面，导入文件的时候 ，可以省略掉.js的后缀名
const BaseService = require("./BaseService");
class AdminInfoService extends BaseService {
    constructor() {
        super("admininfo");
    }
    /**
     * 
     * @param {{ adminname, adminpwd, adminemail, admintel, adminstatus }} 管理员信息 
     * @returns {Promise<boolean>} true代表新增成功，false代表新增失败
     */
    async add({ adminname, adminpwd, adminemail, admintel, adminstatus }) {
        let strSql = `INSERT INTO ${this.currentTableName} 
            (adminname, adminpwd, adminemail, admintel, adminstatus) 
            VALUES 
            ( ?, ?, ?, ?, ?);`;
        let result = await this.executeSql(strSql, [adminname, adminpwd, adminemail, admintel, adminstatus]);
        return result.affectedRows > 0;
    }
    update(){
        
    }
    getList(){

    }
}


module.exports = AdminInfoService;