/**
 * 爆炸动画对象
 */
import assetsConfig from "./assetsConfig.js";
import GameObject from "./GameObject.js";
import gameContainer from "./gameContainer.js";

export default class Boom extends GameObject {
    constructor(x, y) {
        let img = assetsConfig.imgList[6];
        super(x, y, img);
        this.width = 0;
        this.height = 0;
    }
    /**
     * 重写draw的方法
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx) {
        this.width += 2;
        this.height += 2;
        this.x -= 1;
        this.y -= 1;
        super.draw(ctx);
        if (this.width > this.img.width || this.height > this.img.height) {
            //绘画应该结束掉了
            let index = gameContainer.boomList.indexOf(this);
            if (index != -1) {
                gameContainer.boomList.splice(index, 1);
            }
        }
    }
}