/**
 * 对数据表roominfo的操作
 */

const BaseService = require("./BaseService.js");

class RoomInfoService extends BaseService {
    // 在new的时候会自动执行
    constructor() {
        super("roominfo");
    }
    async add({ roomname, roomarea, ownername, onersex, IDCard, telephone, email, roomstatus }) {
        let strSql = `INSERT INTO ${this.currentTableName} 
            (roomname, roomarea, ownername, onersex, IDCard, telephone, email, roomstatus) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;
        let result = await this.executeSql(strSql, [roomname, roomarea, ownername, onersex, IDCard, telephone, email, roomstatus]);
        return result.affectedRows > 0;
    }

    update() {

    }
    /**
     * 查询房间信息
     * @param {{ownername, roomname, telephone}} 查询参数 
     * @returns {Promise<Array>} 返回数据库的查询结果
     */
    async getList({ ownername, roomname, telephone }) {
        //这是最基本的一个SQL语句
        let strSql = `select * from ${this.currentTableName} where 1 = 1 `;
        //查询条件拼接的SQL语句
        let strWhere = ``;
        // 定义一个参数数组
        let ps = [];
        if (ownername) {
            strWhere += ` and ownername like ? `;
            ps.push(`%${ownername}%`);
        }
        if (roomname) {
            strWhere += ` and roomname like ? `;
            ps.push(`%${roomname}%`);
        }
        if (telephone) {
            strWhere += ` and telephone = ? `;
            ps.push(telephone);
        }
        //最后将2条SQL语句合在一起
        strSql += strWhere;
        let result = await this.executeSql(strSql, ps);
        return result;
    }



    async getList2({ ownername, roomname, telephone }) {
        let strSql = `select * from ${this.currentTableName} where 1 = 1 `;
        let { strWhere, ps } = this.paramsInit()
            .like(ownername,"ownername")
            .like(roomname,"roomname")    
            .equal(telephone,"telephone");

        //最后将2条SQL语句合在一起
        strSql += strWhere;
        let result = await this.executeSql(strSql, ps);
        return result;
    }
}


module.exports = RoomInfoService;