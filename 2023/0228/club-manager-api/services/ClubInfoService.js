const PageResult = require("../model/PageResult");
const BaseService = require("./BaseService");

class ClubInfoService extends BaseService {
    constructor(){
        super("club_info")
    }

    /**
     * 添加社团信息
     * @param {{club_name,club_desc,club_master,club_teacher}} param0 
     * @returns 
     */
    async add({club_name,club_desc,club_master,club_teacher}){
        let strSql = `insert into ${this.tableMap.clubinfo} (club_name,club_desc,club_master,club_teacher) value(?,?,?,?)`;
        let result = await this.executeSql(strSql,[club_name,club_desc,club_master,club_teacher]);
        return result.affectedRows > 0;
    }

    /**
     * 修改社团信息
     * @param {{id,club_name,club_desc,club_master,club_teacher}} param0 
     * @returns 
     */
    async update({id,club_name,club_desc,club_master,club_teacher}){
        let strSql = `update ${this.tableMap.clubinfo} set club_name = ?,club_desc = ?,club_master = ?,club_teacher = ? where id = ? and isDel = false;`
        let result = await this.executeSql(strSql,[club_name,club_desc,club_master,club_teacher,id]);
        return result.affectedRows > 0;
    }



    /**
     * 分页查询数据
     * @param {pageIndex,club_name,club_teacher} param0
     * @returns
     */
         async getListByPage({pageIndex,club_name,club_teacher}){
            let strSql = `select * from ${this.tableMap.clubinfo} where isDel = false`;
            let countSql = `select count(*) totalCount from ${this.tableMap.clubinfo} where isDel = false`;
            let {strWhere,ps} = this.paramsInit().like(club_name,"club_name").like(club_teacher,"club_teacher");

            strSql += strWhere + ` limit ${(pageIndex - 1) * 10},10;`;
            countSql += strWhere;
    
            let [listData,[{totalCount}]] = await this.executeSql(strSql + countSql,[...ps,...ps]);
            let pageResult = new PageResult(pageIndex,totalCount,listData);
            return pageResult;
        }

}


module.exports = ClubInfoService;