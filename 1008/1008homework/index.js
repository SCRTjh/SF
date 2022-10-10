const axios = require("axios");
const cheerio = require("cheerio");
const path = require("path");
const fs = require("fs");
const nodemailer = require("nodemailer");
const xlsx = require("node-xlsx").default;
const iconv = require("iconv-lite");




catchFirst = async () => {
    //抓7个页面
    console.log("开始请求");
    let result = [];

    for (let i = 1; i < 8; i++) {
        // let str = "http://www.hxut.edu.cn/plus/list.php?tid=69&TotalResult=3682&PageNo=" + i;
        let str = `http://www.wut.edu.cn/html/news/list_${i}.html`; //武昌理工新闻页url
        console.log(i);
        //发起请求
        try {
            //发送新闻页请求
            let resp = await axios.get(str, {
                Headers: {
                    // accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                    // cookie: "safedog-flow-item=3C59E8EA7C15EA29ABA3890956E8C338"
                    accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9"
                },
                responseType: "arraybuffer"
            });

            // console.log(resp.data);
            //设置字符集
            const html1 = iconv.decode(resp.data, "gb2312");
            //解析传回页面
            let $ = cheerio.load(html1);
            $(".column_list_5>li").each(async (index, ele) => {
                // console.log(ele);
                let newsTitle = $(ele).find("a").text();  //取出新闻标题
                let newsTime = $(ele).find("span.date").text(); //取出发布时间
                let newsLink = $(ele).find("a").attr("href"); //取出新闻链接

                //根据新闻链接发送新闻内容页请求
                let resp2 = await axios.get("http://www.wut.edu.cn/" + newsLink, {
                    Headers: {
                        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9"
                    },
                    responseType: "arraybuffer"
                });
                const html2 = iconv.decode(resp2.data, "gb2312");
                let $1 = cheerio.load(html2);
                let newsReadCount = $1("table").find("td:first").text();
                let newsContent = $1("table td p").find("span").text();

                //数据解构放入对象
                let obj = {
                    newsTitle,
                    newsTime,
                    newsLink,
                    newsReadCount,
                    newsContent
                }
                //对象放入结果数组
                result.push(obj);
                // console.log(obj);


            });


        } catch (error) {
            console.log("抓取失败", error);
        }

    }

    // console.log(result);
    //导出为txt
    let resultJsonStr = JSON.stringify(result);
    fs.writeFileSync(path.join(__dirname, "./data.txt"), resultJsonStr);
    console.log("数据保存成功");
    //导出为excel
    let p1 = path.join(__dirname, "./data.txt");
    let buff = fs.readFileSync(p1);  //读取data.txt将数据转为字符串再转json
    let jsonStr = buff.toString();
    let arr = JSON.parse(jsonStr);
    //初始化excelObj的数据
    let excelObj = {
        name: "Sheet1",
        data: []
    }

    let firstRow = Object.keys(arr[0]);  //取键名为第一行表头
    excelObj.data.push(firstRow);

    for (let item of arr) { //遍历取值
        excelObj.data.push(Object.values(item));
    }

    let excelSavePath = path.join(__dirname, "./data.xlsx");
    let excelBuff = xlsx.build([excelObj]);  //构建xlsx文件

    fs.writeFileSync(excelSavePath, excelBuff);
    console.log("生成成功");

    //发送邮件
    //第一步:创建一个邮件传输对象
    let passport = nodemailer.createTransport({
        host: "smtp.qq.com",
        port: 465,
        auth: {
            user: "1277662732@qq.com",
            pass: 
        }
    });
    try {
        //第二步：发送邮件
        let result = await passport.sendMail({
            subject: "汤俊豪的作业",
            from: "1277662732@qq.com",
            to: [
                "1277662732@qq.com",
                "mh475201314@163.com"
            ],
            text: "吾见华夏官网，必爬之！",
            attachments: [
                {
                    filename: "data.xlsx",
                    path: path.join(__dirname, "./data.xlsx")
                }
            ]
        })

        console.log("发送邮件成功");
        console.log(result);

    } catch (error) {
        console.log("发送邮件失败", error);
    }

}

catchFirst();