/**
 * @author 汤俊豪
 * @desc admininfo模块的操作
 */

const BaseService = require("./BaseService");

class AdminInfoService extends BaseService {
    constructor() {
        super("admininfo");
    }
}

module.exports = AdminInfoService;