/**
 * 基础的JS代码
 */

// 当页面渲染完成以后,去检查一下,是否有登录,如果没有登录就去登录
// document.addEventListener("DOMContentLoaded", function (event) {
//     let adminInfo = sessionStorage.getItem("adminInfo")
//     if (adminInfo) {
//         //说明用户已经登录过了
//     } else {
//         //说明用户没有登录
//         //如果用户正好就在登录界面,我们就不管了
//         // /login.html
//         if (/\/login\.html/.test(location.pathname)) {
//             //正好处理登录页面,不我们不用管
//         } else {
//             location.replace("login.html");
//         }
//     }
// });

document.addEventListener("readystatechange", function () {
    if (document.readyState == "interactive") {
        let adminInfo = sessionStorage.getItem("adminInfo")
        if (adminInfo) {
            //说明用户已经登录过了
        } else {
            //说明用户没有登录
            //如果用户正好就在登录界面,我们就不管了
            // /login.html
            if (/\/login\.html/.test(location.pathname)) {
                //正好处理登录页面,不我们不用管
            } else {
                top.location.replace("login.html");
            }
        }
    }
})


/**
 * 所有页面请求的Ajax的基础的地址
 */
const baseURL = "http://127.0.0.1:16888";

/**
 * 我要将jQuery里面的Ajax做二次封装
 * ajax请求有可能会成功，有可能会失败，并且，它是一个异步的
 * 所以我们应该使用ES6里面的哪个技术来完成
 */
const request = {
    get(str, data = {}) {
        return new Promise((resolve, reject) => {
            $.ajax({
                method: "GET",
                url: str,
                dataType: "json",
                data: data,
                beforeSend: (xhr) => {
                    //在每次发起请求之前,我都从缓存里面拿到adminInfo
                    let adminInfoStr = sessionStorage.getItem("adminInfo");
                    if (adminInfoStr) {
                        let adminInfo = JSON.parse(adminInfoStr);
                        xhr.setRequestHeader("authorization", adminInfo.token);
                    }
                    return xhr;
                },
                success: result => {
                    //这里的success只能代表请求回来了，并不能代码这个地方的请值是成功的
                    if (result.status === "success") {
                        resolve(result);
                    } else {
                        reject(result);
                    }
                },
                error: (error) => {
                    if (error.status === 403) {
                        //说明ajax的请求没有授权
                        top.location.replace("login.html");
                    }
                    console.log(error)
                    reject(error);
                }
            })
        });
    },
    post(str, data = {}) {
        return new Promise((resolve, reject) => {
            $.ajax({
                method: "POST",
                url: str,
                dataType: "json",
                data: data,
                beforeSend: (xhr) => {
                    //在每次发起请求之前,我都从缓存里面拿到adminInfo
                    let adminInfoStr = sessionStorage.getItem("adminInfo");
                    if (adminInfoStr) {
                        let adminInfo = JSON.parse(adminInfoStr);
                        xhr.setRequestHeader("authorization", adminInfo.token);
                    }
                    return xhr;
                },
                success: result => {
                    if (result.status === "success") {
                        resolve(result);
                    } else {
                        reject(result);
                    }
                },
                error: (error) => {
                    if (error.status === 403) {
                        //说明ajax的请求没有授权
                        top.location.replace("login.html");
                    }
                    reject(error);
                }
            });
        });
    }
}

/**
 * 根据数字得到房间的状态
 * @param {number} type
 */
function getRoomStatusType(type) {
    let str = "";
    switch (type) {
        case 0:
            str = "自住"
            break;
        case 1:
            str = "出租";
            break;
        case 2:
            str = "未售";
            break;
        case 3:
            str = "其它";
            break;
        default:
            str = "不合法";
            break;
    }
    return str;
}

/**
 * 将手机号进行掩码操作，只展示前3位与后4位，中间的使用*表示，如13812345678就展示成138****5678
 * @param {string} telephone 手机号码
 */
function getMaskTelephone(telephone) {
    // return telephone.slice(0,3)+"****"+telephone.slice(7);
    return telephone.replace(/(?<=^\d{3})\d{4}(?=\d{4}$)/g, "****");
}


