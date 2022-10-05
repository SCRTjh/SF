/**
 * 玩家坦克1
 */

import GameObject from "./GameObject.js";
import direction from "./direction.js";
import gameAsserts from "./gameAsserts.js";
import keySet from "./keySet.js";
import gameConfig from "./gameConfig.js";
import Bullet from "./Bullet.js";

class Tank extends GameObject {
    constructor() {
        //根据方向来决定图片
        let img = gameAsserts.imgObjMap.get("p1tankU.gif")
        let direc = direction.UP;
        super(100, 100, direc, img);
        this.speed = 5;
        this.headImg = gameAsserts.imgObjMap.get("home-bak.jpg");
        this.hp = 100;
        this.totalHp = 100;
        this.score = 0;
        this.isFire = false;

        while (gameConfig.fireAudioList.length < 10) {
            let audio = new Audio();
            audio.src = gameAsserts.audioMap.get("fire.wav");
            gameConfig.fireAudioList.push(audio);
        }
    }

    move() {
        //根据键盘容器，来完成判断操作
        if (keySet.has(65)) { //A键
            this.direc = direction.LEFT;
            this.img = gameAsserts.imgObjMap.get("p1tankL.gif");
            this.x -= this.speed;
        }
        else if (keySet.has(68)) {
            this.direc = direction.RIGHT;
            this.img = gameAsserts.imgObjMap.get("p1tankR.gif");
            this.x += this.speed;
        }
        else if (keySet.has(87)) {
            this.direc = direction.UP;
            this.img = gameAsserts.imgObjMap.get("p1tankU.gif");
            this.y -= this.speed;
        }
        else if (keySet.has(83)) {
            this.direc = direction.DOWN;
            this.img = gameAsserts.imgObjMap.get("p1tankD.gif");
            this.y += this.speed;
        }
        if (this.x < 0) {
            this.x = 0;
        }
        else if (this.x > gameConfig.gameWidth - this.width) {
            this.x = gameConfig.gameWidth - this.width;
        }
        else if (this.y < 0) {
            this.y = 0;
        }
        else if (this.y > gameConfig.gameHeight - this.height) {
            this.y = gameConfig.gameHeight - this.height
        }

    }

    /**
     * 重写父级的draw
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx) {
        this.move();
        this.drawHead(ctx);
        super.draw(ctx);
        //开火
        this.fire();
    }

    drawHead(ctx) {
        ctx.drawImage(this.headImg, 10, 10, 80, 80);
        ctx.strokeStyle = "#ffffff";
        ctx.strokeRect(100, 10, 250, 35);
        ctx.fillStyle = "#ff0000";
        ctx.fillRect(100, 10, 250 * this.hp / this.totalHp, 35);
        ctx.textBaseline = "top";
        ctx.font = "28px 微软雅黑";
        ctx.fillText(`得分：${this.score}`, 100, 65);
    }

    /**
     * 坦克开火
     */
    fire() {
        if (keySet.has(74)) {
            if (this.isFire === false) {

                let b = new Bullet(this.x, this.y, this.direc);
                b.x = this.x + this.width / 2 - b.width / 2;
                b.y = this.y + this.height / 2 - b.height / 2;
                gameConfig.bulletSet.add(b);
                let audioF = gameConfig.fireAudioList.shift();
                audioF.play();
                gameConfig.fireAudioList.push(audioF);
                this.isFire = true;
                setTimeout(() => {
                    this.isFire = false;
                }, 250);
            }
        }
    }

}

export default Tank;