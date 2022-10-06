import GameObject from "./gameObject.js";
import gameAssets from "./gameAssets.js";
import direction from "./direction.js";
import gameConfig from "./gameConfig.js";
/**
 * 子弹对象
 */
class Bullet extends GameObject {
    constructor(x, y, dir) {
        let img = gameAssets.imgObjectMap.get("tankmissile.gif");
        super(x, y, dir, img);
        this.speed = 5;
    }
    /**
     * 子弹的移动
     */
    move() {
        if (this.dir == direction.LEFT) {
            this.x -= this.speed;
        }
        else if (this.dir == direction.RIGHT) {
            this.x += this.speed;
        }
        else if (this.dir == direction.UP) {
            this.y -= this.speed;
        }
        else if (this.dir == direction.DOWN) {
            this.y += this.speed;
        }
        if (this.x < 0 || this.x > gameConfig.gameWidth || this.y < 0 || this.y > gameConfig.gameHeight) {
            //子弹跑到屏幕外面
            gameConfig.bulletSet.delete(this);
        }
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx) {
        this.move();
        super.draw(ctx);
    }
}

export default Bullet;