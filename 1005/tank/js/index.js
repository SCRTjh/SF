import gameAsserts from "./gameAsserts.js";
import Tank from "./Tank.js";
import Tank2 from "./Tank2.js";
import keySet from "./keySet.js";
import gameConfig from "./gameConfig.js";
import Enemy from "./Enemy.js";


/**
 * 游戏控制对象
 */

const gameControl = {
    dom: {
        /**
         * @type {HTMLDivElement}
         */
        contentBox: document.querySelector(".content-box"),
        /**
         * @type {HTMLCanvasElement}
         */
        game: document.querySelector("#game"),
    },
    data: {
        /**
         * @type {CanvasRenderingContext2D}
         */
        get ctx() {
            return gameControl.dom.game.getContext("2d");
        },
        /**
         * 玩家1
         * @type {Tank}
         */
        p1: null,
        /**
         * 玩家2
         * @type {Tank}
         */
        p2: null,
        /**
         * 游戏定时器
         */
        gameInterval: null
    },
    /**
     * 绑定页面上的事件
     */
    bindEvent() {
        document.addEventListener("keydown", event => {
            //保存按下的键
            keySet.add(event.keyCode);
            console.log(event.keyCode);
        });

        document.addEventListener("keyup", event => {
            keySet.delete(event.keyCode);
        })
    },
    //检测两个对象是否碰撞
    checkCrash(a, b) {
        if (a.x + a.width < b.x ||
            b.x + b.width < a.x ||
            a.y + a.height < b.y ||
            b.y + b.height < a.y) {
            return false;
        }
        else {
            return true;
        }
    },
    /**
     * 玩家子弹击中敌人
     */
    checkBulletAndEnemyCrash() {
        //玩家1子弹击中敌人
        for (let item1 of Enemy.enemySet) {
            for (let item2 of gameConfig.bulletSet) {
                if (this.checkCrash(item1, item2)) {
                    Enemy.enemySet.delete(item1);
                    gameConfig.bulletSet.delete(item2);
                    this.data.p1.score++;
                    break
                }
            }
        }
        //玩家2子弹击中敌人
        for (let item1 of Enemy.enemySet) {
            for (let item2 of gameConfig.bulletSet2) {
                if (this.checkCrash(item1, item2)) {
                    Enemy.enemySet.delete(item1);
                    gameConfig.bulletSet2.delete(item2);
                    this.data.p2.score++;
                    break
                }
            }
        }
    },
    /**
     * 玩家被敌人子弹击中
     */
    checkPlayerAndEnemyBulletCrash() {
        for (let item1 of gameConfig.enemeyBulletSet) {
            for (let item2 of [this.data.p1, this.data.p2]) {
                if (this.checkCrash(item1, item2)) {
                    gameConfig.enemeyBulletSet.delete(item1);
                    item2.hp -= 10;
                    if (item2.hp == 0) {
                        this.gameOver()
                    }
                    break;
                }
            }
        }
    },
    checkBulletAndEnemyBulletCrash() {
        //玩家1子弹与敌人子弹碰撞
        for (let item1 of gameConfig.enemeyBulletSet) {
            for (let item2 of gameConfig.bulletSet) {
                if (this.checkCrash(item1, item2)) {
                    gameConfig.enemeyBulletSet.delete(item1);
                    gameConfig.bulletSet.delete(item2);
                    break;
                }
            }
        }
        //玩家2子弹与敌人子弹碰撞
        for (let item1 of gameConfig.enemeyBulletSet) {
            for (let item2 of gameConfig.bulletSet2) {
                if (this.checkCrash(item1, item2)) {
                    gameConfig.enemeyBulletSet.delete(item1);
                    gameConfig.bulletSet2.delete(item2);
                    break;
                }
            }
        }
    },
    /**
     * 游戏开始
     */
    async start() {
        let that = this;
        this.dom.game.width = this.dom.contentBox.clientWidth;
        this.dom.game.height = this.dom.contentBox.clientHeight;
        //监控窗体变化，重新设置画布大小
        window.addEventListener("resize", function (event) {
            that.dom.game.width = that.dom.contentBox.clientWidth;
            that.dom.game.height = that.dom.contentBox.clientHeight;
        });

        //等待资源加载
        await gameAsserts.loadAsserts();
        //调用绑定事件的方法
        this.bindEvent();
        //开始bgm
        let ad = new Audio();
        ad.src = gameAsserts.audioMap.get("start.wav");
        ad.play();

        //初始化p1
        this.data.p1 = new Tank();
        //初始化p2
        this.data.p2 = new Tank2();

        this.data.gameInterval = setInterval(() => {
            this.data.ctx.clearRect(0, 0, this.dom.game.width, this.dom.game.height);

            this.data.p1.draw(this.data.ctx);
            this.data.p2.draw(this.data.ctx);
            for (let item of gameConfig.bulletSet) {
                item.draw(this.data.ctx);
            }
            for (let item of gameConfig.bulletSet2) {
                item.draw(this.data.ctx);
            }


            //添加坦克
            Enemy.addSelf();
            //画坦克
            for (let item of Enemy.enemySet) {
                item.draw(this.data.ctx);
                item.fire();
            }
            for (let item of gameConfig.enemeyBulletSet) {
                item.draw(this.data.ctx)
            }

            //添加碰撞检测
            this.checkBulletAndEnemyCrash();
            this.checkBulletAndEnemyBulletCrash();
            this.checkPlayerAndEnemyBulletCrash();

        }, 20)
    },
    /**
     * 游戏结束
     */
    gameOver() {
        clearInterval(this.data.gameInterval);
        this.data.ctx.clearRect(0, 0, this.dom.game.width, this.dom.game.height);
        this.data.ctx.drawImage(gameAsserts.imgObjMap.get("over.gif"), this.dom.game.width / 2 - 100, this.dom.game.height / 2 - 75, 200, 150);
        this.data.ctx.font = "36px 微软雅黑";
        this.data.ctx.style = "#ff0000"
        this.data.ctx.fillText(`玩家1得分：${this.data.p1.score}       玩家2得分：${this.data.p2.score}`, this.dom.game.width / 2 - 260, this.dom.game.height / 2 - 110);

    }


}

gameControl.start();