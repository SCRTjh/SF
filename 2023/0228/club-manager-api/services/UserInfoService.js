const AppConfig = require("../config/AppConfig");
const BaseService = require("./BaseService");
const md5 = require("md5");
const PageResult = require("../model/PageResult");

class UserInfoService extends BaseService {
    constructor(){
        super("user_info")
    }

    async add({user_name,user_sex,user_institute,user_club,user_tel,user_pwd,user_email,role_id}){
        //md5加密加盐
        user_pwd = md5(user_pwd + AppConfig.salt);
        let strSql = `insert into ${this.tableMap.userinfo} (user_name,user_sex,user_institute,user_club,user_tel,user_pwd,user_email,role_id) value (?,?,?,?,?,?,?,?);`;
        let result = await this.executeSql(strSql,[user_name,user_sex,user_institute,user_club,user_tel,user_pwd,user_email,role_id]);
        return result.affectedRows > 0;
    }

    /**
     * 修改用户基本信息，但是不能修改密码
     * @param{id,user_name,user_sex,user_institute,user_tel,user_email}
     * @return
     */
    async update({id,user_name,user_photo,user_sex,user_institute,user_tel,user_email,role_id}){
        let strSql = `update ${this.tableMap.userinfo} set user_name = ?,user_photo = ?,user_sex = ?,user_tel = ?,user_email = ?,user_institute = ?,role_id = ? where id = ?;`
        let result = await this.executeSql(strSql,[user_name,user_photo,user_sex,user_tel,user_email,user_institute,role_id,id]);
        return result.affectedRows > 0;
    }
    
    /**
     * 管理员登录
     * @param {user_tel,user_pwd} 手机号，密码
     * @return
     */
    async checkLogin({user_tel,user_pwd}){
        user_pwd = md5(user_pwd + AppConfig.salt);
        let strSql = `select * from ${this.tableMap.userinfo} where user_tel = ? and user_pwd = ? and isDel = false`;
        let result = await this.executeSql(strSql,[user_tel,user_pwd]);
        return result[0];
    }

    /**
     * 根据id检测是否登录成功
     * @param {{id,user_pwd}} param0
     * @returns
     */
     async checkLoginById({id,user_pwd}){
        user_pwd = md5(user_pwd + AppConfig.salt);
        let strSql = `select * from ${this.tableMap.userinfo}  where id = ? and user_pwd = ? and isDel = false;`;
        let result = await this.executeSql(strSql,[id,user_pwd]);
        return result[0];
    }

    /**
     * 分页查询数据
     * @param {pageIndex,user_sex,user_name} param0
     * @returns
     */
    async getListByPage({pageIndex,user_sex,user_name,user_club}){
        let strSql = `select * from ${this.tableMap.userinfo} where isDel = false`;
        let countSql = `select count(*) totalCount from ${this.tableMap.userinfo} where isDel = false`;
        let {strWhere,ps} = this.paramsInit().like(user_name,"user_name").like(user_sex,"user_sex").equal(user_club,"user_club");

        strSql += strWhere + ` limit ${(pageIndex - 1) * 10},10;`;
        countSql += strWhere;

        let [listData,[{totalCount}]] = await this.executeSql(strSql + countSql,[...ps,...ps]);
        let pageResult = new PageResult(pageIndex,totalCount,listData);
        return pageResult;
    }


    /**
     * 修改密码
     * @param {{newPwd,id}} param0
     * @returns
     */
    async updateUserPwd({newPwd,id}){
        newPwd = md5(newPwd + AppConfig.salt);
        let strSql = `update ${this,this.tableMap.userinfo} set user_pwd = ? where id = ? and isDel = false`;
        let result = await this.executeSql(strSql,[newPwd,id]);
        return result.affectedRows > 0;
    }

}


module.exports = UserInfoService;