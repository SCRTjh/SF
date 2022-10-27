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
         max(if(adminCount='roomCount',totalCount,0)) 'roomCount',
         max(if(adminCount='moneyCount',totalCount,0)) 'moneyCount',
         max(if(adminCount='costTypeCount',totalCount,0)) 'costTypeCount'
         from 
        (select 'adminCount',count(*) 'totalCount' from ${this.tableMap.admininfo}
        union all 
        select 'roomCount',count(*) 'totalCount' from ${this.tableMap.roominfo}
        union all
        select 'moneyCount',sum(totalmoney) 'totalMoney' from ${this.tableMap.costinfo}
        union all
        select 'costTypeCount', count(*) 'totalCount' from ${this.tableMap.costtype}) a`;
        let result = await this.executeSql(strSql);
        return result[0];
    }

    /**
     * 获取费用类别的总金额
     * @return {Promise<Array>}
     */
    async getCostTypeTotalMoney() {
        let strSql = `select a.costname,sum(a.totalmoney) 'totalMoney' from 
            (select a.*,b.costname from ${this.tableMap.costinfo} a
            inner join ${this.tableMap.costtype} b on a.costid = b.id) a
            group by a.costid`;
        let result = await this.executeSql(strSql);
        return result;
    }
}


module.exports = DataViewService;