const ServiceFactory = require("../factory/ServiceFactory");
const PageResult = require("../model/PageResult");
const BaseService = require("./BaseService");

class ActivityInfoService extends BaseService {
    constructor(){
        super("activity_info")
    }


    async add({activity_name,activity_desc,activity_area,activity_type,start_time,end_time,club_id}){
        let strSql = `insert into ${this.tableMap.activityinfo} (activity_name,activity_desc,activity_area,activity_type,start_time,end_time,club_id) value (?,?,?,?,?,?,?)`;
        let result = await this.executeSql(strSql,[activity_name,activity_desc,activity_area,activity_type,start_time,end_time,club_id]);
        return result.affectedRows > 0;
    }

    async update({id,activity_name,activity_desc,activity_area,activity_type,start_time,end_time,club_id}){
        let strSql = `update ${this.tableMap.activityinfo} set activity_name=?,activity_desc=?,activity_area=?,activity_type=?,start_time=?,end_time=?,club_id = ? where id = ?`;
        let result = await this.executeSql(strSql,[activity_name,activity_desc,activity_area,activity_type,start_time,end_time,club_id,id])
        return result.affectedRows > 0;
    }

    async permitActivity(id){
        let strSql = `update ${this.tableMap.activityinfo} set status = 1 where isDel = false and id = ?`;
        let result = await this.executeSql(strSql,[id]);
        return result.affectedRows > 0;
    }

    
    async rejectActivity(id){
        let strSql = `update ${this.tableMap.activityinfo} set status = 2 where isDel = false and id = ?`;
        let result = await this.executeSql(strSql,[id]);
        return result.affectedRows > 0;
    }

    async getListByPage1({ pageIndex = 1, activity_name, club_id }) {
        let strSql = ` select * from ${this.tableMap.activityinfo} where isDel = false and status = 1`;
        let countSql = `select count(*) totalCount from ${this.tableMap.activityinfo} where isDel = false and status = 1`;

        let { strWhere, ps } = this.paramsInit()
            .like(activity_name, "activity_name")
            .equal(club_id, "club_id")

        strSql += strWhere + ` limit ${(pageIndex - 1) * 10} , 10 ;`;
        countSql += strWhere;

        let [listData, [{ totalCount }]] = await this.executeSql(strSql + countSql, [...ps, ...ps]);

        let club_ids = listData.map(item => item.club_id);
        let clubInfoMap = this.resultToMap(await ServiceFactory.createClubInfoService().findByIds(club_ids));

        listData.forEach(item =>{
            item.clubInfo = clubInfoMap.get(item.club_id);
        })

        let pageResult = new PageResult(pageIndex, totalCount, listData);
        return pageResult;
    }

    async getListByPage({ pageIndex = 1, activity_name, club_id }) {
        let strSql = ` select * from ${this.tableMap.activityinfo} where isDel = false `;
        let countSql = `select count(*) totalCount from ${this.tableMap.activityinfo} where isDel = false `;

        let { strWhere, ps } = this.paramsInit()
            .like(activity_name, "activity_name")
            .equal(club_id, "club_id")

        strSql += strWhere + ` limit ${(pageIndex - 1) * 10} , 10 ;`;
        countSql += strWhere;

        let [listData, [{ totalCount }]] = await this.executeSql(strSql + countSql, [...ps, ...ps]);

        let club_ids = listData.map(item => item.club_id);
        let clubInfoMap = this.resultToMap(await ServiceFactory.createClubInfoService().findByIds(club_ids));

        listData.forEach(item =>{
            item.clubInfo = clubInfoMap.get(item.club_id);
        })

        let pageResult = new PageResult(pageIndex, totalCount, listData);
        return pageResult;
    }

}


module.exports = ActivityInfoService;