/**
 * 玩家坦克
 */

import GameObject from "./gameObject.js";
import direction from "./direction.js";
import gameAssets from "./gameAssets.js";
import keySet from "./keySet.js";
import gameConfig from "./gameConfig.js";
import Bullet from "./Bullet.js";

class Tank extends GameObject {
    constructor() {
        //根据方向决定图片
        let img = gameAssets.imgObjectMap.get("p1TankU.gif")
        let dir = direction.UP;
        super(100, 100, dir, img);
        this.speed = 5;
        this.headImg = gameAssets.imgObjectMap.get("home-bak.jpg");
        this.hp = 10;
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
        //console.log(audioList);
    }
    /**
     * 坦克的移动
     */
    move() {
        //根据键盘容器，完成判断操作
        if (keySet.has(65)) {
            //A
            this.dir = direction.LEFT;
            this.img = gameAssets.imgObjectMap.get("p1TankL.gif");
            this.x -= this.speed;
        }
        else if (keySet.has(68)) {
            //D
            this.dir = direction.RIGHT;
            this.img = gameAssets.imgObjectMap.get("p1TankR.gif");
            this.x += this.speed;
        }
        else if (keySet.has(87)) {
            //W
            this.dir = direction.UP;
            this.img = gameAssets.imgObjectMap.get("p1TankU.gif");
            this.y -= this.speed;
        }
        else if (keySet.has(83)) {
            //S
            this.dir = direction.DOWN;
            this.img = gameAssets.imgObjectMap.get("p1TankD.gif");
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
     * 重写父级的draw方法
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx) {
        this.move();
        //画头像
        this.drawHead(ctx);
        super.draw(ctx);
        //调用开火
        this.fire();
    }

    /**
     * 画头像
     * @param {CanvasRenderingContext2D} ctx 
     */
    drawHead(ctx) {
        ctx.drawImage(this.headImg, 10, 10, 80, 80);
        ctx.strokeStyle = "#fff";
        ctx.strokeRect(100, 10, 250, 35);
        ctx.fillStyle = "#ff0000";
        ctx.fillRect(100, 10, 250 * this.hp / this.totalHp, 35);
        ctx.textBaseline = "top";
        ctx.font = "30px 仿宋";
        ctx.fillText(`得分：${this.score}`, 100, 55);
    }

    /**
     * 玩家坦克发射子弹
     */
    fire() {
        if (keySet.has(74)) {
            if (this.isFire === false) {
                let b = new Bullet(this.x, this.y, this.dir);
                b.x = this.x + this.width / 2 - b.width / 2;
                b.y = this.y + this.height / 2 - b.height / 2;
                gameConfig.bulletSet.add(b);
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

    }
}

export default Tank;