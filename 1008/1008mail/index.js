//利用nodemailer向mh475201314@163.com里面发送邮件，邮件携带附件图片

const axios = require("axios");
const cheerio = require("cheerio");
const path = require("path");
const fs = require("fs");
const nodemailer = require("nodemailer");



const cathData = async () => {
    console.log("正在抓取数据");
    let url = "https://v.qq.com/channel/net_tv?channel=tv&feature=10471&iarea=814&listpage=2";
    let config = {
        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        cookie: "tvfe_boss_uuid=181398bda19d56d3; video_guid=bc9b7ed4c4dea547; compared_guid=e347ac8b40870484; ad_play_index=79; video_platform=2; bucket_id=0; pgv_info=ssid=s9526191471; ts_last=v.qq.com/channel/net_tv; pgv_pvid=5323333510; ts_uid=2711949846"
    }

    let resp = await axios(url, config);

    let $ = cheerio.load(resp.data);
    let result = [];

    $(".list_item").each((index, ele) => {
        let movieName = $(ele).find("a.figure_title").text();
        let moviePic = "http:" + $(ele).find("img.figure_pic").attr("src");

        let obj = {
            movieName,
            moviePic
        }
        result.push(obj);
    });


    for (let { moviePic, movieName } of result) {
        let movieImagePath = path.join(__dirname, "./movieImg");
        if (!fs.existsSync(movieImagePath)) {
            fs.mkdirSync(movieImagePath);
        }

        let resp = await axios.get(moviePic, {
            ...config,
            responseType: "stream"
        });

        let imgPath = path.join(__dirname, "./movieImg", `${movieName}.png`);

        let currentStream = fs.createWriteStream(imgPath);

        resp.data.pipe(currentStream);
        console.log("图片保存成功");
        console.log(result);
    }

    const sendMail = async () => {
        let attachments = [];
        for (let { movieName } of result) {
            attachments.push({
                filename: movieName + ".png",
                path: path.join(__dirname, "./movieImg", `${movieName}.png`)
            })
        }
        let passport = nodemailer.createTransport({
            host: "smtp.qq.com",
            port: 465,
            auth: {
                user: "1277662732@qq.com",
                pass: 
            }
        });
        try {
            let result2 = await passport.sendMail({
                subject: "图片",
                from: "1277662732@qq.com",
                to: [
                    "mh475201314@163.com",
                    "1277662732@qq.com"
                ],
                text: `
                    by TJH
                `,
                attachments
            });
            console.log("邮件发送成功");
            console.log(result2);
        } catch (error) {
            console.log("错辣！！", error);
        }
    }

    sendMail();
}

cathData();







