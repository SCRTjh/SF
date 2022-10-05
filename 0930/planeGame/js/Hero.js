import GameObject from "./GameObject.js";
import assetsConfig from "./assetsConfig.js";
import Bullet from "./Bullet.js";
import gameContainer from "./gameContainer.js";
import gameConfig from "./gameConfig.js";

class Hero extends GameObject {
    constructor() {
        let img = assetsConfig.imgList[3];
        super(200, 500, img);
        this._isDoubleBuff = false;
    }

    get isDoubleBuff() {
        return this._isDoubleBuff;
    }
    set isDoubleBuff(v) {
        this._isDoubleBuff = v;
        if (v === true) {
            this.img = assetsConfig.imgList[1];
        }
        else if (v === false) {
            this.img = assetsConfig.imgList[3];
        }
        this.width = this.img.width;
        this.height = this.img.height;
    }


    /**
     * 鼠标控制飞机移动
     * @param {number} x 
     * @param {number} y 
     */
    move(x, y) {
        if (x < 0) {
            x = 0;
        }
        else if (x > gameConfig.gameWidth - this.width) {
            x = gameConfig.gameWidth - this.width
        }
        if (y < 0) {
            y = 0;
        }
        else if (y > gameConfig.gameHeight - this.height) {
            y = gameConfig.gameHeight - this.height
        }
        this.x = x;
        this.y = y;
    }
    /**
     * 玩家飞机发射子弹的方法
     */
    fire() {
        if (this.isDoubleBuff) {
            //双排子弹
            let b_left = new Bullet(this.x, this.y);
            let b_right = new Bullet(this.x, this.y);
            b_left.x = b_left.x + this.width / 4 - b_left.width / 2;
            b_right.x = b_right.x + this.width / 4 * 3 - b_right.width / 2;
            gameContainer.bulletList.push(b_left, b_right);
        }
        else {
            let b = new Bullet(this.x, this.y);
            //修正子弹的坐标
            b.x = b.x + this.width / 2 - b.width / 2;
            gameContainer.bulletList.push(b);
        }

    }
}

export default Hero;