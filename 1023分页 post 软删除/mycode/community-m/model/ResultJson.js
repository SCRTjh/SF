/**
 * @author 汤俊豪
 * @date 2022-10-23
 * @desc 定义统一的JSON返回格式
 */

class ResultJson {
    /**
     * 
     * @param {boolean} flag 请求是否成功的状态，true成功，false失败
     * @param {string} msg 请求返回的消息提示
     * @param {Object} data 请求返回的数据
     */
    constructor(flag, msg, data = []) {
        this.status = flag ? "success" : "fail";
        this.msg = msg;
        this.data = data;
    }
}

module.exports = ResultJson;