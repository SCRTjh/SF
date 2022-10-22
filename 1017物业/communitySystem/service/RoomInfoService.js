/**
 * 对数据表roomlist的操作
 */

const BaseService = require("./BaseService.js");

class RoomInfoService extends BaseService {
    constructor() {
        super("roominfo")
    }

    async add({ roomname, roomarea, ownername, ownersex, IDCard, telephone, email, roomstatus }) {
        let strSql = `insert into ${this.currentTableName}(roomname,roomarea,ownername,ownersex,IDCard,telephone,email,roomstatus) 
        values (?,?,?,?,?,?,?,?);`;
        let result = await this.executeSql(strSql, [roomname, roomarea, ownername, ownersex, IDCard, telephone, email, roomstatus]);
        return result.affectedRows > 0;
    }


    update() {
        ;
    }

    async getList({ ownername, roomname, telephone }) {
        //这是一个基本的SQL语句
        let strSql = `select * from ${this.currentTableName} where 1=1 `;
        //查询条件拼接的SQL语句
        let strWhere = ``;
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
        let strSql = `select * from ${this.currentTableName} where 1=1 `;
        let { strWhere, ps } = this.paramsInit()
            .like(ownername, "ownername")
            .like(roomname, "roomname")
            .equal(telephone, "telephone");

        //最后将2条SQL语句合在一起
        strSql += strWhere;
        let result = await this.executeSql(strSql, ps);
        return result;

    }

}
module.exports = RoomInfoService;