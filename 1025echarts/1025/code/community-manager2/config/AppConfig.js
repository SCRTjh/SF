/**
 * 整个程序的配置文件，所以需要配置的东西，我都写在这里
 * @author 杨标
 * @date 2022-10-24
 */
const path = require("path");

const AppConfig = {
    excelDir: path.join(__dirname, "../excelDir"),
    salt: "098lskdf.!@#09sdfj"
}

module.exports = AppConfig;