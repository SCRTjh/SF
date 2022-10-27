/**
 * @author 杨标
 * @description admininfo模块的操作
 */

const BaseService = require("./BaseService");
const md5 = require("md5");
const AppConfig = require("../config/AppConfig");

class AdminInfoService extends BaseService {
    constructor() {
        super("admininfo");
    }

    /**
     * 新增管理员信息
     * @param {{adminname, adminpwd, adminemail, admintel, adminstatus}}
     * @return {Promise<boolean>} true代表新增成功,false代表新增失败
     */
    async add({adminname, adminpwd, adminemail, admintel, adminstatus}) {
        //现在在这里,要执行sqL语句的新增之前,我们要把密码进行md5的加密
        adminpwd = md5(adminpwd+AppConfig.salt);
        let strSql = `INSERT INTO ${this.currentTableName} (adminname, adminpwd, adminemail, admintel, adminstatus) VALUES (?, ?, ?, ?, ?);`
        let result = await this.executeSql(strSql, [adminname, adminpwd, adminemail, admintel, adminstatus]);
        return result.affectedRows > 0;
    }

    /**
     * 检测用户名的登录
     * @param {{adminname,adminpwd}}
     * @return {Promise<Object>} 返回用户登录的对象,有可能为空
     */
    async checkLogin({adminname,adminpwd}){
        adminpwd = md5(adminpwd+AppConfig.salt);
        let strSql = `select * from ${this.currentTableName} where isDel = false and adminname=? and adminpwd = ? `;
        let result = await this.executeSql(strSql,[adminname,adminpwd]);
        return result[0];
    }
}


module.exports = AdminInfoService;