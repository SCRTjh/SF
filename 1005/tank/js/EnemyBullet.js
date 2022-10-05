import GameObject from "./GameObject.js";
import gameAsserts from "./gameAsserts.js";
import direction from "./direction.js";
import gameConfig from "./gameConfig.js";

/**
 * 子弹对象
 */

class EnemyBullet extends GameObject {
    constructor(x, y, direc) {
        let img = gameAsserts.imgObjMap.get("enemymissile.gif");
        super(x, y, direc, img);
        this.speed = 10;
    }

    /**
     * 子弹的移动
     */
    move() {
        if (this.direc == direction.LEFT) {
            this.x -= this.speed;
        }
        else if (this.direc == direction.RIGHT) {
            this.x += this.speed;
        }
        else if (this.direc == direction.UP) {
            this.y -= this.speed;
        }
        else if (this.direc == direction.DOWN) {
            this.y += this.speed;
        }
        if (this.x < 0 || this.x > gameConfig.gameWidth || this.y < 0 || this.y > gameConfig.gameHeight) {
            //跑出屏幕，从集合删除
            gameConfig.enemeyBulletSet.delete(this);
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


export default EnemyBullet;