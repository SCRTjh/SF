/**
 * 玩家坦克2
 */

import GameObject from "./GameObject.js";
import direction from "./direction.js";
import gameAsserts from "./gameAsserts.js";
import keySet from "./keySet.js";
import gameConfig from "./gameConfig.js";
import Bullet from "./Bullet.js";

class Tank2 extends GameObject {
    constructor() {
        //根据方向来决定图片
        let img = gameAsserts.imgObjMap.get("p2tankU.gif")
        let direc = direction.UP;
        super(300, 100, direc, img);
        this.speed = 5;
        this.headImg = gameAsserts.imgObjMap.get("home-bak.jpg");
        this.hp = 10;
        this.totalHp = 100;
        this.score = 0;
        this.isFire = false;
        //初始化音频资源池
        while (gameConfig.fireAudioList.length < 10) {
            let audio = new Audio();
            audio.src = gameAsserts.audioMap.get("fire.wav");
            gameConfig.fireAudioList.push(audio);
        }
    }

    move() {
        //根据键盘容器，来完成判断操作
        if (keySet.has(37)) { //A键
            this.direc = direction.LEFT;
            this.img = gameAsserts.imgObjMap.get("p2tankL.gif");
            this.x -= this.speed;
        }
        else if (keySet.has(39)) {
            this.direc = direction.RIGHT;
            this.img = gameAsserts.imgObjMap.get("p2tankR.gif");
            this.x += this.speed;
        }
        else if (keySet.has(38)) {
            this.direc = direction.UP;
            this.img = gameAsserts.imgObjMap.get("p2tankU.gif");
            this.y -= this.speed;
        }
        else if (keySet.has(40)) {
            this.direc = direction.DOWN;
            this.img = gameAsserts.imgObjMap.get("p2tankD.gif");
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
        ctx.drawImage(this.headImg, 460, 10, 80, 80);
        ctx.strokeStyle = "#ffffff";
        ctx.strokeRect(550, 10, 250, 35);
        ctx.fillStyle = "#ff0000";
        ctx.fillRect(550, 10, 250 * this.hp / this.totalHp, 35);
        ctx.textBaseline = "top";
        ctx.font = "28px 微软雅黑";
        ctx.fillText(`得分：${this.score}`, 550, 65);
    }

    /**
     * 坦克开火
     */
    fire() {
        if (keySet.has(96)) {
            if (this.isFire === false) {
                let b = new Bullet(this.x, this.y, this.direc);
                b.x = this.x + this.width / 2 - b.width / 2;
                b.y = this.y + this.height / 2 - b.height / 2;
                gameConfig.bulletSet2.add(b);
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

export default Tank2;