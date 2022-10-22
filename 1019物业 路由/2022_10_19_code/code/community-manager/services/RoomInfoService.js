/**
 * @author 杨标
 * @description roomInfo模块的操作
 */

const BaseService = require("./BaseService");

class RoomInfoService extends BaseService {
    constructor() {
        super("roominfo");
    }
    /**
     * 根据条件查询房间信息
     * @param {{ ownername, roomname, telephone }} param0 查询参数
     * @returns {Promise<Array>}
     */
    async getList({ ownername, roomname, telephone }) {
        let strSql = ` select * from ${this.currentTableName} where 1 = 1 `;
        let { strWhere, ps } = this.paramsInit()
            .like(ownername, "ownername")
            .like(roomname, "roomname")
            .like(telephone, "telephone");
        strSql += strWhere;
        let result = await this.executeSql(strSql, ps);
        return result;
    }
}


module.exports = RoomInfoService;