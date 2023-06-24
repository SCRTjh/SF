const PageResult = require("../model/PageResult");
const BaseService = require("./BaseService");
const ServiceFactory = require('../factory/ServiceFactory');

class JoinapplyInfoService extends BaseService {
    constructor(){
        super("joinapply_info")
    }


    /**
     * 添加入社申请
     * @param {{user_id,club_id}} param0 
     * @returns 
     */
    async add({user_id,club_id}){
        let strSql = `insert into ${this.tableMap.joinapplyinfo} (user_id,club_id) value(?,?);`;
        let result = await this.executeSql(strSql,[user_id,club_id]);
        return result.affectedRows > 0;
    }

    /**
     * 同意入社申请
     * @param {id} id 
     * @returns 
     */
    async permitUpdate(id){
        let strSql = `update ${this.tableMap.joinapplyinfo} set status = 1 where isDel = false and id = ?; `
        let result = await this.executeSql(strSql,[id]);
        if(result){
            let strSql2 = `select * from ${this.tableMap.joinapplyinfo} where isDel = false and id = ?;`;
            let [{user_id,club_id}] = await this.executeSql(strSql2,[id]);
            let strSql3 = `update ${this.tableMap.userinfo} set user_club = (select club_name from ${this.tableMap.clubinfo} where isDel = false and id = ${club_id}) where isDel = false and id = ?`;
            let result3 = await this.executeSql(strSql3,[user_id]);
            return result3.affectedRows > 0;
        }
    }

     /**
     * 拒绝入社申请
     * @param {id} id 
     * @returns 
     */
    async rejectUpdate(id){
        let strSql = `update ${this.tableMap.joinapplyinfo} set status = 2 where isDel = false and id = ?; `
        let result = await this.executeSql(strSql,[id]);
        return result.affectedRows > 0;
    }

    async checkApply(user_id){
        let strSql = `select * from ${this.tableMap.joinapplyinfo} where user_id = ? and status in (1,0);`;
        let result = await this.executeSql(strSql,[user_id]);
        return result;
    }

    /**
     * 展示所有入社申请信息
     * @param {}  
     * @returns 
     */
    async getAllInfoList(){
        let strSql = `select joinapply_info.id,user_info.user_name,club_info.club_name,joinapply_info.create_time,joinapply_info.status from joinapply_info,user_info,club_info where joinapply_info.user_id = user_info.id and joinapply_info.club_id = club_info.id;`
        let result = await this.executeSql(strSql);
        return result
    }

    /**
     * 分页查询数据
     * @param {pageIndex,club_name,club_teacher} param0
     * @returns
     */
         async getListByPage({pageIndex,user_id,status, user_club,startTime, endTime}){
            let strSql = `select * from ${this.tableMap.joinapplyinfo} where isDel = false`;
            let countSql = `select count(*) totalCount from ${this.tableMap.joinapplyinfo} where isDel = false`;
            let club_id = "";
            if(user_club){
                let strSql2 = `select * from ${this.tableMap.clubinfo} where club_name = '${user_club}' and isDel = false`;
                let result2 = await this.executeSql(strSql2);
                console.log(result2);
                club_id = result2[0].id;
            }

            let { strWhere, ps } = this.paramsInit()
            .equal(user_id,"user_id")
            .equal(club_id,"club_id")
            .equal(status, "status")
            .gte(startTime, "create_time")
            .lte(endTime, "create_time")
            .ob('status','ASC')

            strSql +=  strWhere + ` limit ${(pageIndex - 1) * 10},10;`;
            countSql += strWhere;
    
            let [listData,[{totalCount}]] = await this.executeSql(strSql + countSql,[...ps,...ps]);
            if(listData.length){
                let user_ids = listData.map(item => item.user_id);
                let club_ids = listData.map(item => item.club_id);
                let userInfoMap = this.resultToMap(await ServiceFactory.createUserInfoService().findByIds(user_ids));
                let clubInfoMap = this.resultToMap(await ServiceFactory.createClubInfoService().findByIds(club_ids));
                listData.forEach(item => {
                    item.userInfo = userInfoMap.get(item.user_id);
                    item.clubInfo = clubInfoMap.get(item.club_id);
                })
            }
            let pageResult = new PageResult(pageIndex,totalCount,listData);
            return pageResult;
        }


}


module.exports = JoinapplyInfoService;