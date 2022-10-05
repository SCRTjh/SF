/**
 * 敌机
 */
import GameObject from "./GameObject.js";
import assetsConfig from "./assetsConfig.js";
import gameConfig from "./gameConfig.js";
import gameContainer from "./gameContainer.js";

export default class Enemy extends GameObject {
    constructor() {
        let temp = parseInt(Math.random() * 100);
        /** @type {HTMLImageElement} */
        let img = null;
        if (temp < 15) {
            //大飞机
            img = assetsConfig.imgList[4];
        }
        else {
            //小飞机
            img = assetsConfig.imgList[5];
        }
        let x = parseInt(Math.random() * (gameConfig.gameWidth-img.width));
        super(x, 0, img);
        this.speed = parseInt(Math.random() * 3) + 2;
        this.y = -this.height;
    }
    move() {
        this.y += this.speed;
        if (this.y > gameConfig.gameHeight) {
            //移除自己
            let index = gameContainer.enemyList.indexOf(this);
            if (index != -1) {
                gameContainer.enemyList.splice(index, 1);
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