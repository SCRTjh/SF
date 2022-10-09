const axios = require("axios");

const cheerio = require("cheerio");

const path = require("path");
const fs = require("fs");

const catchData = async () => {
    let str = "https://www.iqiyi.com/kszt/wlj.html?vfrm=pcw_dianshiju&vfrmblk=&vfrmrst=711219_dianshiju_rmwj_more";
    try {
        let resp = await axios.get(str, {
            headers: {
                accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                cookie: "__uuid=1c0b0430-4958-73cf-6ce3-401fa115045b; QC005=5788b604647c35b48111b5dfbf8e2dbc; QC173=1; P00004=.1665145005.0f9e3734bf; QC175=%7B%22upd%22%3Atrue%2C%22ct%22%3A%22%22%7D; QC008=1665145006.1665145006.1665145006.1; QC010=0.6498042231155916; QC007=DIRECT; __dfp=a04deb16da1157445cb71beb5f25c4d3c79cb3f23829acbb94a8b3d1fd268b6d87@1666441005687@1665145006687; PCAU=0"
            }
        });
        //响应结果在data里面
        // console.log(resp.data);
        //使用cheerio 来分析网页，并加载成$对象
        let $ = cheerio.load(resp.data);

        let result = [];
        $(".lequ-li").each((index, ele) => {
            let movieName = $(ele).find("a.row-link").text();
            let movieEpisode = $(ele).find("span.lequ-img-label").text();
            let moviePic = "http:" + $(ele).find("img.img-cover").attr("src");

            let obj = {
                movieName,
                movieEpisode,
                moviePic
            }
            // console.log(obj);
            result.push(obj);
        })

        let resultJsonStr = JSON.stringify(result);

        fs.writeFileSync(path.join(__dirname, "./data.txt"), resultJsonStr);
        console.log("数据保存成功");

        for (let { moviePic, movieName } of result) {   //从结果中解构出图片的url与影剧名
            let movieImagePath = path.join(__dirname, "./movieImage")  //准备保存文件夹
            if (!fs.existsSync(movieImagePath)) {
                fs.mkdirSync(movieImagePath);
            }
            let resp = await axios.get(moviePic, {  //发送请求
                headers: {
                    accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                    cookie: "__uuid=1c0b0430-4958-73cf-6ce3-401fa115045b; QC005=5788b604647c35b48111b5dfbf8e2dbc; QC173=1; P00004=.1665145005.0f9e3734bf; QC175=%7B%22upd%22%3Atrue%2C%22ct%22%3A%22%22%7D; QC008=1665145006.1665145006.1665145006.1; QC010=0.6498042231155916; QC007=DIRECT; __dfp=a04deb16da1157445cb71beb5f25c4d3c79cb3f23829acbb94a8b3d1fd268b6d87@1666441005687@1665145006687; PCAU=0"
                }
                , responseType: "stream"  //以文件流接受

            });
            let imgPath = path.join(__dirname, "./movieImage", `${movieName}.png`); //准备保存文件的路径
            let currentStream = fs.createWriteStream(imgPath);  //转为文件流路径
            resp.data.pipe(currentStream);  //根据文件流地址导入重铸
            console.log("图片保存成功");
        }


    } catch (error) {
        console.log("出错了", error);
    }
}

catchData();

