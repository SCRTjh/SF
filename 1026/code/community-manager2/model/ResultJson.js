/**
 * 定义统一的JSON返回格式
 * @author 杨标
 * @date 2022-10-20
 */


class ResultJson {
    /**
     *  
     * @param {boolean} flag 请求是否成功的状态 ，true就是成功，false就是失败
     * @param {string} msg  请求返回 的消息提示
     * @param {Object} data   请求返回的数据
     */
    constructor(flag, msg, data = []) {
        this.status = flag ? "success" : "fail";
        this.msg = msg;
        this.data = data;
    }
}


module.exports = ResultJson;