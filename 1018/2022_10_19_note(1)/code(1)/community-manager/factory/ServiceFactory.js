/**
 * @author 杨标
 * @date 2022-10-18
 * @description ServiceFactory生成服务的工厂
 */

class ServiceFactory {
    static createAdminInfoService() {
        const AdminInfoService = require("../service/AdminInfoService");
        return new AdminInfoService();
    }

    static createCostInfoService() {
        const CostInfoService = require("../service/CostInfoService");
        return new CostInfoService();
    }

    static createCostTypeService() {
        const CostTypeService = require("../service/CostTypeService");
        return new CostTypeService();
    }

    static createRoomInfoService() {
        const RoomInfoService = require("../service/RoomInfoService");
        return new RoomInfoService();
    }
}

module.exports = ServiceFactory;