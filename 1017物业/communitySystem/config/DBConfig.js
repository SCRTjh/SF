/**
 * 本地数据库连接的配置信息
 */
const localDBConfig = {
    host: "127.0.0.1",
    port: 3306,
    user: "sg",
    password: "123456",
    database: "community"
}

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