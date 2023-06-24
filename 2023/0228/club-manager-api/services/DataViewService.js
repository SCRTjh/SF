/**
 * 用于数据展示的Service操作，不涉及到任何的具体的表
 */
 const BaseService = require("./BaseService");

 class DataViewService extends BaseService {
     constructor() {
         super();
         //因为不涉及到任何具体的表，所以我不用传参给父级，这样我们也不使用currentTableName这个属性
     }
 
     /**
      * 获取计算的总数
      * @returns {Promise<Object>} 返回查询的结果的对象
      */
     async getCalcData() {
         let strSql = `select 
          max(if(adminCount='adminCount',totalCount,0)) 'adminCount',
          max(if(adminCount='clubCount',totalCount,0)) 'clubCount',
          max(if(adminCount='studentCount',totalCount,0)) 'studentCount',
          max(if(adminCount='activityCount',totalCount,0)) 'activityCount'
          from 
         (select 'adminCount',count(*) 'totalCount' from ${this.tableMap.userinfo}  where role_id = 0 or role_id = 1
         union all 
         select 'clubCount',count(*) 'totalCount' from ${this.tableMap.clubinfo} 
         union all
         select 'studentCount',count(*) 'totalCount' from ${this.tableMap.userinfo} where role_id = 2 or role_id = 3
         union all
         select 'activityCount', count(*) 'totalCount' from ${this.tableMap.activityinfo} where isDel = false) a `;
         let result = await this.executeSql(strSql);
         return result[0];
     }
 
     /**
      * 获取各社团的成员数
      * @return {Promise<Array>}
      */
     async getClubTotalCount() {
         let strSql = `select user_club,COUNT(id) as count from ${this.tableMap.userinfo} where user_club != '' GROUP BY user_club`;
         let result = await this.executeSql(strSql);
         return result;
     }


    /**
      * 获取各类型的活动数
      * @return {Promise<Array>}
      */
           async getActivityTotalCount() {
            let strSql = `select activity_type as name ,COUNT(id) as value from ${this.tableMap.activityinfo} WHERE isDel = false and status = 1 GROUP BY activity_type;`;
            let result = await this.executeSql(strSql);
            return result;
        }
 }
 
 
 module.exports = DataViewService;