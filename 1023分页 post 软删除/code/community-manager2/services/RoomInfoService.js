/**
 * @author 杨标
 * @description roomInfo模块的操作
 */

const BaseService = require("./BaseService");
const PageResult = require("../model/PageResult");

class RoomInfoService extends BaseService {
    constructor() {
        super("roominfo");
    }

    /**
     * 根据条件查询
     * @param {{ roomname, ownername, telephone }} param0 查询参数
     * @returns {Promise<Array>} 查询结果
     */
    async getList({ roomname, ownername, telephone }) {
        let strSql = `select * from ${this.currentTableName} where isDel = false `;
        let { strWhere, ps } = this.paramsInit()
            .like(roomname, "roomname")
            .like(ownername, "ownername")
            .like(telephone, "telephone");
        strSql += strWhere;
        let result = await this.executeSql(strSql, ps);
        return result;
    }

    /**
     * 根据条件来进行分页的查询
     * @param {{roomname, ownername, telephone, pageIndex=1}} param0  参数
     */
    async getListByPage({ roomname, ownername, telephone, pageIndex = 1 }) {
        let strSql = ` select * from ${this.currentTableName} where isDel = false `;
        let { strWhere, ps } = this.paramsInit()
            .like(roomname, "roomname")
            .like(ownername, "ownername")
            .like(telephone, "telephone");

        //第一条sql语句
        strSql += strWhere + ` limit ${(pageIndex - 1) * 10},10 ;`;
        //第二条sql语句
        let countSql = ` select count(*) 'totalCount' from ${this.currentTableName} where isDel = false `;
        countSql += strWhere;
        //现在执行的是2条sql语句，所以result里面就会有2个结果
        let [listData, [{ totalCount }]] = await this.executeSql(strSql + countSql, [...ps, ...ps]);
        // listData就是第一条sql语句所执行的结果，它是一个列表 
        // totalCount就是第二条sql语句所执行的结果 ，它是一个totalCount总数
        //现在我要通过totalCount 得到pageCount,pageStart,pageEnd这几个值
        let pageResult = new PageResult(pageIndex, totalCount, listData);
        return pageResult;
    }
    /**
     * 新增房间信息
     * @param {{roomname, roomarea, ownername, ownersex, IDCard, telephone, email, roomstatus}} param0 
     * @returns {Promise<Boolean>} true代表新增成功，false代表新增失败
     */
    async add({ roomname, roomarea, ownername, ownersex, IDCard, telephone, email, roomstatus }) {
        let strSql = ` INSERT INTO ${this.currentTableName} 
            ( roomname, roomarea, ownername, ownersex, IDCard, telephone, email, roomstatus) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?) `;
        let result = await this.executeSql(strSql, [roomname, roomarea, ownername, ownersex, IDCard, telephone, email, roomstatus]);
        return result.affectedRows > 0;
    }
}


module.exports = RoomInfoService;