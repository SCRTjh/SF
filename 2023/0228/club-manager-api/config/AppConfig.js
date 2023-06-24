/**
 * 整个程序的配置文件，所以需要配置的东西，我都写在这里
 * @author 汤俊豪
 * @date 2022-10-24
 */
const path = require("path");

const AppConfig = {
    excelDir: path.join(__dirname, "../excelDir"),
    salt: "098lskdf.!@#09sdfj",
    secret: "asdfk90/.,!@#$213",
    noRequireAuth:[
        /\/userInfo\/checkLogin/
    ]
}

module.exports = AppConfig;