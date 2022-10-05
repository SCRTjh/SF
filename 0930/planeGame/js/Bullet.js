/**
 * 玩家子弹
 * 玩家的飞机在哪里，玩家的子弹就在哪里发射
 */
import GameObject from "./GameObject.js";
import assetsConfig from "./assetsConfig.js";
import gameContainer from "./gameContainer.js";

export default class Bullet extends GameObject {
    constructor(x, y) {
        let img = assetsConfig.imgList[2];
        super(x, y, img);
        this.width = img.width / 2;
        this.height = img.height / 2;
        this.speed = 20;
    }
    /**
     * 移动的方法
     */
    move() {
        this.y -= this.speed;
        if (this.y < 0) {
            //子弹已经出了边界
            let index = gameContainer.bulletList.indexOf(this);
            if (index != -1) {
                gameContainer.bulletList.splice(index, 1);
            }
        }
    }
    /**
     * 重写draw的方法
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx) {
        this.move();
        super.draw(ctx);
    }

}

