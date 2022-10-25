/**
 * 本地数据库连接的配置信息
 */
const localDBConfig = {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "t374288",
    database: "community",
    multipleStatements: true
}
/**
 * 远程数据库的连接
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