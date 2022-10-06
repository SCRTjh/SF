import gameAssets from "./gameAssets.js";
import Tank from "./Tank.js";
import keySet from "./keySet.js";
import gameConfig from "./gameConfig.js";
import Enemy from "./Enemy.js";
import Tank2 from "./Tank2.js";
import Bullet from "./Bullet.js";
import BulletEnemy from "./BulletEnemy.js";
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
         *  @type {HTMLCanvasElement}
         */
        game: document.querySelector("#game"),

        /**
         * @type {HTMLAudioElement}
         */
        bgm: document.querySelector("#bgm"),

        /** @type {HTMLBottomElement} */
        btnStart: document.querySelector("#btn-start"),
        /**
         * @type {HTMLAudioElement}
         */
        bgmDie: document.querySelector("#bgmDie"),
    },
    data: {
        /**
         * @type {CanvasRenderingContext2D}
         */
        get ctx() {
            return gameControl.dom.game.getContext("2d");
        },
        /**
         * @type {Tank}
         */
        p1: null,

        p2: null,
        //定时器
        gameInterval: null,
    },

    /**
     * 绑定页面上面的事件
     */
    bindEvent() {
        //this指向外面的this,正常情况下事件绑定不适用箭头函数
        document.addEventListener("keydown", event => {
            // //每按下一个键，就把这个键的编码保存起来
            // this.data.keySet.add(event.keyCode);
            // console.log(this.data.keySet)
            keySet.add(event.keyCode);
            // if (event.keyCode == 74) {
            //     this.data.p1.fire();
            // }
            //console.log(keySet);

        });
        document.addEventListener("keyup", event => {
            // //每按下一个键，就把这个键的编码保存起来
            // this.data.keySet.delete(event.keyCode);
            keySet.delete(event.keyCode);
        });

        this.dom.btnStart.addEventListener("click", function (event) {
            //console.log(this);
            gameControl.start2();
            this.style.display = "none";
            // this.dom.bgmDie.volume = 0.5;
            // console.log(this.dom.bgmDie);
            // this.dom.bgmDie.play();
        })


    },


    checkCrash(a, b) {
        if (a.x + a.width < b.x || b.x + b.width < a.x || a.y + a.height < b.y || b.y + b.height < a.y) {
            return false;
        }
        else {
            return true;
        }
    },
    //检测子弹1和敌机
    checkEnemyBulletCrash() {
        for (let item1 of gameConfig.bulletSet) {
            for (let item2 of Enemy.EnemySet) {
                let bullet = item1;
                let enemy = item2;
                let flag = this.checkCrash(bullet, enemy);
                if (flag) {
                    Enemy.EnemySet.delete(item2);
                    gameConfig.bulletSet.delete(item1);
                    this.data.p1.score++;
                }
            }

        }
    },
    //检测子弹2和敌机
    checkEnemy2BulletCrash() {
        for (let item1 of gameConfig.bullet2Set) {
            for (let item2 of Enemy.EnemySet) {
                let bullet2 = item1;
                let enemy = item2;
                let flag = this.checkCrash(bullet2, enemy);
                if (flag) {
                    Enemy.EnemySet.delete(item2);
                    gameConfig.bullet2Set.delete(item1);
                    this.data.p2.score++;
                }
            }

        }
    },
    //敌机子弹和玩家1
    checkBulletEnemyCrash() {
        for (let item1 of gameConfig.bulletEnemySet) {
            let bulletEnemy = item1;
            let tank = this.data.p1;
            //console.log(tank);
            let flag = this.checkCrash(bulletEnemy, tank);
            if (flag) {
                //移除子弹
                gameConfig.bulletEnemySet.delete(item1);
                tank.hp = tank.hp - 10;
                if (tank.hp <= 0) {
                    this.stop();
                    this.dom.bgmDie.volume = 0.5;
                    console.log(this.dom.bgmDie);
                    this.dom.bgmDie.play();
                }
            }
        }
    },

    //敌机子弹和玩家2
    checkBulletTank2Crash() {
        for (let item1 of gameConfig.bulletEnemySet) {
            let bulletEnemy = item1;
            let tank2 = this.data.p2;
            //console.log(tank);
            let flag = this.checkCrash(bulletEnemy, tank2);
            if (flag) {
                //移除子弹
                gameConfig.bulletEnemySet.delete(item1);
                tank2.hp = tank2.hp - 10;
                if (tank2.hp <= 0) {
                    this.stop();

                }
            }
        }
    },
    //子弹与子弹发生碰撞
    checkBulletBulletCrash() {
        for (let item1 of gameConfig.bulletEnemySet) {
            for (let item2 of gameConfig.bulletSet) {
                let bulletEnemy = item1;
                let bullet = item2;
                let flag = this.checkCrash(bulletEnemy, bullet);
                if (flag) {
                    gameConfig.bulletEnemySet.delete(item1);
                    gameConfig.bulletSet.delete(item2);
                }
            }
        }
    },
    start2() {
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

            for (let item of gameConfig.bulletEnemySet) {
                item.draw(this.data.ctx);
            }

            for (let item of gameConfig.bullet2Set) {
                item.draw(this.data.ctx);
            }

            //调用坦克静态方法，来添加自己
            Enemy.addThis();
            //画敌方坦克
            for (let item of Enemy.EnemySet) {
                item.draw(this.data.ctx);
                //console.log(item);
            }
            this.checkEnemyBulletCrash();
            this.checkBulletEnemyCrash();
            this.checkEnemy2BulletCrash();
            this.checkBulletTank2Crash();
        }, 20);
    },
    async start() {
        var that = this;
        this.dom.btnStart.style.display = "none";
        this.dom.bgm.volume = 0.5;
        this.dom.bgm.play();
        this.dom.game.width = this.dom.contentBox.clientWidth;
        this.dom.game.height = this.dom.contentBox.clientHeight;
        //窗口大小发生变化，画布自己也变
        window.addEventListener("resize", function (event) {
            that.dom.game.width = that.dom.contentBox.clientWidth;
            that.dom.game.height = that.dom.contentBox.clientHeight;
        })
        //等待资源加载
        await gameAssets.loadAssets();
        //调用绑定dom事件的方法
        this.bindEvent();
        this.start2()


    },


    /**
     * 游戏结束
     */
    stop() {
        clearInterval(this.data.gameInterval);
        console.log(this.data.gameInterval);
        this.data.ctx.clearRect(0, 0, this.dom.game.width, this.dom.game.height);
        this.data.ctx.textAlign = "center";
        this.data.ctx.textBaseline = "middle";
        this.data.ctx.font = "42px 微软雅黑";
        this.data.ctx.fillStyle = "red";
        this.data.ctx.fillText("p1最终得分:" + this.data.p1.score + "    " + "p2最终得分:" + this.data.p2.score, gameConfig.gameWidth / 2, gameConfig.gameHeight / 2);
        this.dom.btnStart.style.display = "block";

    },
}
gameControl.start();