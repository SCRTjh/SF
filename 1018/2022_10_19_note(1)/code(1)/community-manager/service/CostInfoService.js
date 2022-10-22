/**
 * costinfo数据表的操作
 */
const BaseService = require("./BaseService.js");
class CostInfoService extends BaseService {
    constructor() {
        super("costinfo");
    }
    /**
     * 新增
     * @param {{ roomid, costid, paytime, count, price, totalmoney, paytype }} 费用信息
     * @returns {Promise<boolean>} true新增成功，fales新增失败
     */
    async add({ roomid, costid, paytime, count, price, totalmoney, paytype }) {
        let strSql = `INSERT INTO ${this.currentTableName} 
            ( roomid, costid, paytime, count, price, totalmoney, paytype) 
            VALUES 
            (?, ?, ?, ?, ?, ?, ?);`;
        let result = await this.executeSql(strSql, [roomid, costid, paytime, count, price, totalmoney, paytype])
        return result.affectedRows > 0;
    }
    update() {

    }
    async getList({ ownername, roomid, costid }) {
        let strSql = `select a.*,b.ownername,c.costname from ${this.tableMap.costinfo} a
            inner join ${this.tableMap.roominfo} b on a.roomid = b.id
            inner join ${this.tableMap.costtype} c on c.id = a.costid
            where 1=1 `;
        let { strWhere, ps } = this.paramsInit()
            .like(ownername, "ownername")
            .equal(roomid, "roomid")
            .equal(costid, "costid");
        strSql += strWhere;
        let result = await this.executeSql(strSql, ps);
        return result;
    }
}

module.exports = CostInfoService;