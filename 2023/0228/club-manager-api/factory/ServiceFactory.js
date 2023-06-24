/**
 * @author 汤俊豪
 * @description 服务层工厂
 */


 class ServiceFactory {
    //用户
    static createUserInfoService(){
        const UserInfoService = require("../services/UserInfoService");
        return new UserInfoService();
    }
    //社团
    static createClubInfoService(){
        const ClubInfoService = require("../services/ClubInfoService");
        return new ClubInfoService();
    }
    //社团活动
    static createActivityInfoService(){
        const ActivityInfoService = require("../services/ActivityInfoService");
        return new ActivityInfoService();
    }
    //申请
    static createJoinapplyInfoService(){
        const JoinapplyInfoService = require("../services/JoinapplyInfoService");
        return new JoinapplyInfoService();
    }
    //角色
    static createRoletypeInfoService(){
        const RoletypeInfoService = require("../services/RoletypeInfoService");
        return new RoletypeInfoService();
    }
    //评论
    static createCommentInfoService(){
        const CommentInfoService = require("../services/CommentInfoService");
        return new CommentInfoService();
    }
    //数据展示
    static createDataViewService(){
        const DataViewService = require("../services/DataViewService");
        return new DataViewService();
    }
}

module.exports = ServiceFactory;