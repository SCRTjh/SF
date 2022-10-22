/**
 * 本地数据库连接的配置信息
 */
const localDBConfig = {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "t374288",
    database: "community"
}

/**
 * 远程数据库的连接
 */
const remoteDBConfig = {
    host: "www.softeem.xin",
    port: 3306,
    user: "dev",
    password: "123456",
    database: "community"
}

module.exports = {
    localDBConfig,
    remoteDBConfig
}