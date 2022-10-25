/**
 * @author 汤俊豪
 * @desc 服务层工厂
 */

class ServiceFactory {
    static createAdminInfoService() {
        const AdminInfoService = require("../services/AdminInfoService");
        return new AdminInfoService();
    }
    static createRoomInfoService() {
        const RoomInfoService = require("../services/RoomInfoService");
        return new RoomInfoService();
    }
}

module.exports = ServiceFactory;