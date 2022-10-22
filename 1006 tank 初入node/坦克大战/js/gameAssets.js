/**
 * 游戏的资源文件
 */

const gameAssets = {
    /**
     * 需要加载的资源
     */
    imgMap: new Map([
        ["p1TankU.gif", "./img/p1TankU.gif"],
        ["p1TankD.gif", "./img/p1TankD.gif"],
        ["p1TankL.gif", "./img/p1TankL.gif"],
        ["p1TankR.gif", "./img/p1TankR.gif"],
        ["home-bak.jpg", "./img/home-bak.jpg"],
        ["woman3(1).webp", "./img/woman3(1).webp"],
        ["tankmissile.gif", "./img/tankmissile.gif"],
        ["p2TankU.gif", "./img/p2TankU.gif"],
        ["p2TankD.gif", "./img/p2TankD.gif"],
        ["p2TankL.gif", "./img/p2TankL.gif"],
        ["p2TankR.gif", "./img/p2TankR.gif"],
        ["enemy1D.gif", "./img/enemy1D.gif"],
        ["enemy1U.gif", "./img/enemy1U.gif"],
        ["enemy1L.gif", "./img/enemy1L.gif"],
        ["enemy1R.gif", "./img/enemy1R.gif"],
        ["title.gif", "./img/title.gif"],
        ["enemymissile.gif", "./img/enemymissile.gif"],
    ]),
    /**
     * 加载好的资源放在这里
     */
    imgObjectMap: new Map(),
    loadAssets() {
        //返回一个承诺
        return new Promise((resolve, reject) => {
            //记录已经加载图片的数量
            let count = 0;
            //遍历需要加载的资源
            for (let [k, v] of this.imgMap) {
                let img = new Image();
                img.src = v;
                this.imgObjectMap.set(k, img);
                //异步
                img.onload = () => {
                    count++;
                    if (count == this.imgMap.size) {
                        console.log("资源已经加载完成");
                        resolve();
                    }
                }
                img.onerror = (error) => {
                    console.log(error);
                    reject();
                }
            }
        });

    },


}

export default gameAssets;