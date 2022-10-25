/**
 * @author 杨标
 * @description costtype模块的操作
 */

const BaseService = require("./BaseService");
const PageResult = require("../model/PageResult");

class CostTypeService extends BaseService {
    constructor() {
        super("costtype");
    }


    async getListByPage({ costname, pageIndex = 1 }) {
        let strSql = ` select * from ${this.currentTableName} where isDel = false `;
        let { strWhere, ps } = this.paramsInit()
            .like(costname, "costname");

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

    async add({ costname, price, description }) {
        let strSql = ` INSERT INTO ${this.currentTableName} 
            ( costname,price,description) 
            VALUES (?, ?, ?) `;
        let result = await this.executeSql(strSql, [costname, price, description]);
        return result.affectedRows > 0;
    }

}


module.exports = CostTypeService;