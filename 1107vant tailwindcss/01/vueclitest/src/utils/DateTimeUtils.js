/**
 * 用于处理日期或时间的一个工具类
 */

import dayjs from "dayjs";

/**
 * 
 * @param {String|Date|Number} _d 日期时间
 * @param {String} split 日期格式
 * @returns {String} 处理后的日期字符串
 */
export const formatDateTime = (_d, split = "YYYY-MM-DD HH:mm:ss") => {
    let d = dayjs(_d)
    if (d.isValid()) {
        return d.format(split);
    } else {
        return "";
    }
}