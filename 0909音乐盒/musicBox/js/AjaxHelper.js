/**
 * AjaxHelper 工具类
 * @author TJH
 * @date 2022-9-6
 */


var AjaxHelper = {
    /**
     * 
     * @param {string} url 请求的地址 
     * @param {Function} callBack 请求成功以后的回调函数 
     */
    get: function (url, callBack) {
        var xhr = this.init(callBack);
        xhr.open("GET", url, true);
        xhr.send();
    },
    post: function (url, callBack) {
        var xhr = this.init(callBack);
        xhr.open("POST", url, true);
        xhr.send();
    },
    /**
     * 初始化
     * @param {Function} callBack
     * @returns {XHMHttpRequest} 创建好的xhr对象
     */
    init: function (callBack) {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var result = xhr.response;
                if (typeof callBack === "function") {
                    callBack(result)
                }
            } else {
                console.log(xhr.readyState, xhr.status);
            }
        })
        return xhr;
    }
}