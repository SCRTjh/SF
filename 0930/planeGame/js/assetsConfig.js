/**
 * 这里面配置的都是需要加载的资源图片
 */
const assetsList = [
    "./assets/bg1.jpg",
    "./assets/plane_0.png",
    "./assets/fire.png",
    "./assets/plane_1.png",
    "./assets/enemy_big.png",
    "./assets/enemy_small.png",
    "./assets/boom_big.png"
]

/**
 * 资源管理对象，所以加载好的资源都通过它进行管理
 */
const assetsConfig = {
    /** 
     * @description 存放加载好的资源图片
     * @type {HTMLImageElement[]} 
     * */
    imgList: [],
    loadAssets() {
        let p = new Promise((resolve, reject) => {
            let count = 0;
            for (let i = 0; i < assetsList.length; i++) {
                let img = new Image();
                img.src = assetsList[i];
                this.imgList.push(img);
                img.onload = event => {
                    count++;
                    if (count == assetsList.length) {
                        console.log("资源加载完成");
                        resolve();  //将承诺的等待状态转变成功状态
                    }
                }
                img.onerror = event => {
                    reject();
                }
            }
        })

        return p;
    }
}

export default assetsConfig;