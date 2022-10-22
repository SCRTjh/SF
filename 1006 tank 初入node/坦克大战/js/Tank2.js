import Tank from "./Tank.js";
import gameAssets from "./gameAssets.js";
import direction from "./direction.js";
import GameObject from "./gameObject.js";
import keySet from "./keySet.js";
import gameConfig from "./gameConfig.js";
import Bullet2 from "./Bullet2.js";
/**
 * 玩家坦克二
 */
class Tank2 extends GameObject {
    constructor() {
        //根据方向决定图片
        let img = gameAssets.imgObjectMap.get("p2TankU.gif");
        let dir = direction.UP;
        super(gameConfig.gameWidth - 160, 100, dir, img);
        this.speed = 5;
        this.headImg = gameAssets.imgObjectMap.get("woman3(1).webp");
        this.hp = 100;
        this.totalHp = 100;
        this.score = 0;
        /**
        * 用于表示是否正在发射子弹
        */
        this.isFire = false;
        while (gameConfig.audioList.length < 10) {
            let audio = new Audio();
            audio.src = "./gameMusic/fire_bullet.mp3";
            gameConfig.audioList.push(audio);
        }
    }

    draw(ctx) {
        //画头像
        this.drawHead(ctx);
        super.draw(ctx);
        this.move();
        this.fire();
    }

    /**
     * 画头像
     * @param {CanvasRenderingContext2D} ctx 
     */
    drawHead(ctx) {
        ctx.drawImage(this.headImg, gameConfig.gameWidth - 90, 10, 80, 80);
        ctx.strokeStyle = "#fff";
        ctx.strokeRect(gameConfig.gameWidth - 350, 10, 250, 35);
        ctx.fillStyle = "#ff0000";
        ctx.fillRect(gameConfig.gameWidth - 350, 10, 250 * this.hp / this.totalHp, 35);
        ctx.textBaseline = "top";
        ctx.font = "30px 仿宋";
        ctx.fillText(`得分：${this.score}`, gameConfig.gameWidth - 210, 55);
    }

    /**
     * 坦克的移动
     */
    move() {
        //根据键盘容器，完成判断操作
        if (keySet.has(37)) {
            //左37
            this.dir = direction.LEFT;
            this.img = gameAssets.imgObjectMap.get("p2TankL.gif");
            this.x -= this.speed;
        }
        else if (keySet.has(39)) {
            //右39
            this.dir = direction.RIGHT;
            this.img = gameAssets.imgObjectMap.get("p2TankR.gif");
            this.x += this.speed;
        }
        else if (keySet.has(38)) {
            //上38
            this.dir = direction.UP;
            this.img = gameAssets.imgObjectMap.get("p2TankU.gif");
            this.y -= this.speed;
        }
        else if (keySet.has(40)) {
            //下40
            this.dir = direction.DOWN;
            this.img = gameAssets.imgObjectMap.get("p2TankD.gif");
            this.y += this.speed;
        }
        if (this.x < 0) {
            this.x = 0
        }
        else if (this.x > gameConfig.gameWidth - this.width) {
            this.x = gameConfig.gameWidth - this.width;
        }
        if (this.y < 0) {
            this.y = 0
        }
        else if (this.y > gameConfig.gameHeight - this.height) {
            this.y = gameConfig.gameHeight - this.height
        }

    }

    /**
    * 玩家坦克发射子弹
    */
    fire() {
        if (keySet.has(32)) {
            if (this.isFire === false) {
                let b = new Bullet2(this.x, this.y, this.dir);
                b.x = this.x + this.width / 2 - b.width / 2;
                b.y = this.y + this.height / 2 - b.height / 2;
                gameConfig.bullet2Set.add(b);
                //资源池里面
                var audio = gameConfig.audioList.shift();
                //拿了以后播放音乐
                audio.play();
                //用完再放回来
                gameConfig.audioList.push(audio);
                this.isFire = true;
                setTimeout(() => {
                    this.isFire = false;
                }, 250)
            }

        }
        // //资源池里面
        // var audio = this.audioList.shift();
        // //拿了以后播放音乐
        // audio.play();
        // //用完再放回来
        // this.audioList.push(audio);
    }
}

export default Tank2;
