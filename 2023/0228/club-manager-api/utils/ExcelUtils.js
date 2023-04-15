/**
 * ExcelUtils.js文件 ，专门用于Excel的相关操作的
 */

const xlsx = require("node-xlsx");
const fs = require("fs");

class ExcelUtils {
    /**
     * 将一个数组对象生成一个excel的文件
     * @param {Array} result 数据库查询出来的结果，是一个数组
     * @param {string} savePath 保存excel的路径
     */
    static exportToExcel(result, savePath) {
        if (Array.isArray(result) && result.length > 0) {
            //说明有数据,构建excel所生成的需要的数据
            let excelObj = [
                {
                    name: "Sheet1",
                    data: []
                }
            ]
            //第一步：构建excel的表头
            excelObj[0].data.push(Object.keys(result[0]));
            //第二步：构建生成的excel的内容
            result.forEach(item => {
                excelObj[0].data.push(Object.values(item));
            });
            //第三步：生成excel所需要的数据
            let buff = xlsx.build(excelObj);
            //第四步：将excel的数据写入到文件里面去
            fs.writeFileSync(savePath, buff);
        } else {
            //没有数据
            throw new Error("要保存为excel的数据为空，不能够生成excel文件");
        }
    }
}
module.exports = ExcelUtils;