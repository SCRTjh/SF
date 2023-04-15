const BaseService = require("./BaseService");
const PageResult = require("../model/PageResult");
const ServiceFactory = require('../factory/ServiceFactory');



class CommentInfoService extends BaseService {
    constructor() {
        super("comment_info")
    }


    async add({ activity_id, user_id, comment_desc }) {
        let strSql = `insert into ${this.tableMap.commentinfo} (activity_id,user_id,comment_desc) value(?,?,?)`;
        let result = await this.executeSql(strSql, [activity_id, user_id, comment_desc]);
        return result.affectedRows > 0;
    }



    /**
     * 更新活动的评论，正常情况下，只能更新评论的内容，不能更新其它的
     * @param {{comment_desc,id}} param0 
     * @returns 
     */
    async update({ comment_desc, id }) {
        let strSql = `update ${this.tableMap.commentinfo} set comment_desc = ? where id = ? and isDel = false `;
        let result = await this.executeSql(strSql, [comment_desc, id]);
        return result.affectedRows > 0;

    }


    async getListByPage({ pageIndex, activity_id, user_id, startTime, endTime }) {
        let strSql = ` select * from ${this.tableMap.commentinfo} where isDel = false `;
        let countSql = `select count(*) totalCount from ${this.tableMap.commentinfo} where isDel = false `;

        let { strWhere, ps } = this.paramsInit()
            .equal(user_id, "user_id")
            .equal(activity_id, "activity_id")
            .gte(startTime, "create_time")
            .lte(endTime, "create_time")

        strSql += strWhere + ` limit ${(pageIndex - 1) * 10} , 10 ;`;
        countSql += strWhere;

        let [listData, [{ totalCount }]] = await this.executeSql(strSql + countSql, [...ps, ...ps]);
        if(listData.length){
            let activity_ids = listData.map(item => item.activity_id);
            let user_ids = listData.map(item => item.user_id);
            let activityInfoMap = this.resultToMap(await ServiceFactory.createActivityInfoService().findByIds(activity_ids));
            let userInfoMap = this.resultToMap(await ServiceFactory.createUserInfoService().findByIds(user_ids));
            listData.forEach(item => {
                item.activityInfo = activityInfoMap.get(item.activity_id);
                item.userInfo = userInfoMap.get(item.user_id);
            })
        }
        let pageResult = new PageResult(pageIndex, totalCount, listData);
        return pageResult;
    }


    async findById(id) {
        let result = await super.findById(id);
        if (result) {
            result.userInfo = await ServiceFactory.createUserInfoService().findById(result.id);
            result.activityInfo = await ServiceFactory.createActivityInfoService().findById(result.id);
        }
        return result;
    }



}

module.exports = CommentInfoService;