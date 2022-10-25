/**
 * @author 汤俊豪
 * @Date 2022-10-23
 * @desc 数据库连接的配置信息
 */

/**
 * 本地连接配置信息
 */
const localDBConfig = {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "t374288",
    database: "community",
    multipleStatements: true  //支持同时运行多语句
}

/**
 * 远程连接配置信息
 */
const remoteDBConfig = {
    port: 3306,
    user: "dev",
    database: "community",
    multipleStatements: true
}

module.exports = {
    localDBConfig,
    remoteDBConfig
}