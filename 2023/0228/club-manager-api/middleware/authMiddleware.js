const AppConfig = require("../config/AppConfig");
const ResultJson = require("../model/ResultJson");
const jwt = require("jsonwebtoken");

/**
 * 检验授权中间件
 * @param {import("express").Request} req 
 * @param {import("express").Response} resp 
 * @param {import("express").NextFunction} next 
 */
const authMiddleware = (req, resp, next) => {
    //第一步：检查请求是否是预检的options请求
    if (req.method.toUpperCase() === "OPTIONS") {
        return next();
    } else {
        let token = req.header("authorization") || req.query.authorization;
        if (token) {
            //说明这个人带了令牌，我们就要去验证这个令牌
            try {
                let decode = jwt.verify(token, AppConfig.secret);
                req.header["loginUserInfo"] = decode;
                //在这里要你女朋友据
                //如果没有报错，就说明是令牌验证成功了
                return next();
            } catch (e) {
                //如果报错了，就说明是令牌验证失败了
                let resultJson = new ResultJson(false, "令牌验证失败");
                resp.status(403).json(resultJson);
            }

        } else {
            //说明这个人没有带令牌
            //1.这是一些特殊的路径，要直接放行，如登录
            let flag = AppConfig.noRequireAuth.some(item => item.test(req.path));
            if (flag) {
                //说明是特殊路径，我们要放行
                return next();
            } else {
                //2.说明不是特殊路径,就直接返回403的状态
                let resultJson = new ResultJson(false, "请求未授权");
                resp.status(403).json(resultJson);
            }
        }
    }
}

module.exports = authMiddleware;