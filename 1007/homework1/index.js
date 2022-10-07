const { info } = require("console");
const fs = require("fs");
const path = require("path");
// 将abc目录及子目录下所有的txt文件列出来
let p = path.join(__dirname, "./abc");
console.log(p);

emptyDir = (p) => {

    let info1 = fs.statSync(p);

    if (fs.existsSync(p)) {
        if (info1.isDirectory()) {  //是文件则判断是否有文件
            //有文件则找到文件夹下潜
            fs.readdirSync(p).forEach(item => {
                let p2 = p + "\\" + item;
                let info2 = fs.statSync(p2);
                emptyDir(p2);
                if (info2.isDirectory() && fs.readdirSync(p2).length == 0) {
                    console.log(p2);
                    fs.rmdirSync(p2);
                }
            })

        } else { //不是文件夹就删掉
            fs.unlinkSync(p);
        }
    } else {
        console.log("路径不存在");
    }
}

deleteAll = (p) => {
    emptyDir(p);
    fs.rmdirSync(p);
}


deleteAll(p);


