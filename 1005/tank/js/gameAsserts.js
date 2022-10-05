/**
 * 游戏资源文件
 */

const gameAsserts = {
    /**
     * 需要加载的资源
     */
    imgMap: new Map([
        ["p1tankU.gif", "./img/p1tankU.gif"],
        ["p1tankD.gif", "./img/p1tankD.gif"],
        ["p1tankL.gif", "./img/p1tankL.gif"],
        ["p1tankR.gif", "./img/p1tankR.gif"],
        ["p2tankU.gif", "./img/p2tankU.gif"],
        ["p2tankD.gif", "./img/p2tankD.gif"],
        ["p2tankL.gif", "./img/p2tankL.gif"],
        ["p2tankR.gif", "./img/p2tankR.gif"],
        ["home-bak.jpg", "./img/home-bak.jpg"],
        ["tankmissile.gif", "./img/tankmissile.gif"],
        ["enemymissile.gif", "./img/enemymissile.gif"],
        ["enemy1D.gif", "./img/enemy1D.gif"],
        ["enemy1U.gif", "./img/enemy1U.gif"],
        ["enemy1L.gif", "./img/enemy1L.gif"],
        ["enemy1R.gif", "./img/enemy1R.gif"],
        ["over.gif", "./img/over.gif"],
    ]),
    audioMap: new Map([["start.wav", "./img/start.wav"],
    ["fire.wav", "./img/fire.wav"]]),
    /**
     * 加载好的资源就放在这里
     */
    imgObjMap: new Map(),
    /**
     * 加载资源的方法
     * @returns {Promise}
     */
    loadAsserts() {
        //加载资源的时候，返回一个承诺
        return new Promise((resolve, reject) => {
            //记录已经加载的图片的加载资源
            let count = 0;
            //需要加载的资源
            for (let [k, v] of this.imgMap) {

                let img = new Image();
                img.src = v;
                this.imgObjMap.set(k, img)
                img.onload = () => {
                    count++;
                    if (count == this.imgMap.size) {
                        console.log("资源加载完成");
                        resolve()
                    }
                }
                img.onerror = (error) => {
                    console.log(error, "资源加载失败");
                    reject();
                }
            }
        });


    }

}

export default gameAsserts;