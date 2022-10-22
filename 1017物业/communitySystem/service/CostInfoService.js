/**
 * 对数据表costinfo的操作
 */

// const DBUtils = require("../utils/DBUtils.js");
const BaseService = require("./BaseService.js");

class CostInfoService extends BaseService {
    constructor() {
        super("costinfo ")
    }

    /**
     * 
     * @param {{costname,price,description}} 数据库的参数 
     * @returns {Promise<Boolean>} true代表新增成功，false代表新增失败
     */
    async add({ roomid, costid, paytime, count, price, totalmoney, paytype }) {
        let strSql = `insert into ${this.currentTableName}(roomid,costid,paytime,count,price,totalmoney,paytype) 
         values (?,?,?,?,?,?,?);`;
        let result = await this.executeSql(strSql, [roomid, costid, paytime, count, price, totalmoney, paytype]);
        return result.affectedRows > 0;
    }


    update() {
        ;
    }

    getList() {
        ;
    }

    // select roominfo.id,roominfo.ownername,roominfo.roomname,costtype.costname,costinfo.count,costinfo.price,costinfo.totalmoney 
    // from roominfo 
    // INNER JOIN (costinfo) on roominfo.id = costinfo.roomid
    // INNER JOIN costtype on costinfo.costid = costtype.id

    async getList2({ ownername, roomname, costname }) {
        let strSql = `select roominfo.id,roominfo.ownername,roominfo.roomname,costtype.costname,costinfo.count,costinfo.price,costinfo.totalmoney 
        from roominfo 
        INNER JOIN costinfo on roominfo.id = costinfo.roomid
        INNER JOIN costtype on costinfo.costid = costtype.id
        WHERE 1=1 `;
        let { strWhere, ps } = this.paramsInit()
            .like(ownername, "ownername")
            .like(roomname, "roomname")
            .equal(costname, "costname");

        //最后将2条SQL语句合在一起
        strSql += strWhere;
        let result = await this.executeSql(strSql, ps);
        return result;

    }

}
module.exports = CostInfoService;