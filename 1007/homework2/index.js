/**
 * 在这里编写代码
 */

const fs = require("fs");
const path = require("path");

const musicData = [];
let p1 = path.join(__dirname, "./data");
let info1 = fs.statSync(p1);
if (fs.existsSync(p1)) {
    if (info1.isDirectory()) {
        fs.readdirSync(p1).forEach(item => {  //根据文件数添加对象
            let obj = {};
            let lrcTextPath = path.join(p1, item) + "\\" + item + ".lrc";  //歌词路径
            obj["picPath"] = item + "/" + item + ".jpg";
            obj["lrcPath"] = item + "/" + item + ".lrc";
            obj["lrcText"] = fs.readFileSync(lrcTextPath).toString();
            obj["musicPath"] = item + "/" + item + ".mp3";
            fs.readdirSync(path.join(p1, item)).forEach(item2 => {  //正则匹配.txt
                obj["musicName"] = item2.match(/.+(?=\.txt)/ig);
            })
            obj["musicName"] = obj["musicName"][0] //数组中去出
            console.log(obj);
            musicData.push(obj);
        })
        //写入文件
        fs.writeFileSync(path.join(__dirname, "./musicData.txt"), JSON.stringify(musicData));
    } else {
        console.log("不是一个文件夹");
    }

} else {
    console.log("路径错误");
}

