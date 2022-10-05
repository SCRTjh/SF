import assetsConfig from "./assetsConfig.js";
import Background from "./Background.js";
import GameObject from "./GameObject.js";
import Hero from "./Hero.js";
import gameContainer from "./gameContainer.js";
import gameConfig from "./gameConfig.js";
import Enemy from "./Enemy.js";
import Boom from "./Boom.js";

const gameControl = {
    dom: {
        /** @type {HTMLCanvasElement} */
        game: document.querySelector("#game")
    },
    data: {
        /** @type {CanvasRenderingContext2D} */
        ctx: null,
        p1FireTimerId: null
    },

    bindEvent() {
        this.dom.game.addEventListener("mousemove", event => {
            event = event || window.event;
            let { offsetX, offsetY } = event;
            if (gameContainer.p1) {
                gameContainer.p1.move(offsetX, offsetY);
            }
        });
        this.dom.game.addEventListener("mousedown", event => event.button == 0 && this.p1Fire());
        document.addEventListener("mouseup", event => {
            event = event || window.event;
            this.p1StopFire();
        });
    },
    async init() {
        this.dom.game.width = gameConfig.gameWidth;
        this.dom.game.height = gameConfig.gameHeight;
        this.data.ctx = this.dom.game.getContext("2d");
        //调用加载资源的方法
        await assetsConfig.loadAssets();
        //等资源加载完成了，才能开始后面的代码
        this.bindEvent();
        gameContainer.bg = new Background();
        gameContainer.p1 = new Hero();
        gameContainer.p1.isDoubleBuff = true;
        gameConfig.level = 1;

        this.addEnemy();
        this.draw();
    },
    /**
     * 定时刷新，重新绘制
     */
    draw() {
        setInterval(() => {
            this.checkBulletAndEnemyCrash();

            // 通过反射拿到所有的属性名，然后遍历
            // 如果这个对象不为空，并且是GameObject的游戏 对象，我就去把它画出来
            Reflect.ownKeys(gameContainer).forEach(item => {
                if (gameContainer[item] && gameContainer[item] instanceof GameObject) {
                    gameContainer[item].draw(this.data.ctx);
                }
                else if (gameContainer[item] instanceof Array) {
                    //为了避免沙漏效应产生，我们使用倒序
                    for (let i = gameContainer[item].length - 1; i >= 0; i--) {
                        gameContainer[item][i].draw(this.data.ctx);
                    }
                }
            });
        }, 20);
    },
    /**
     * 玩家1飞机开火的方法
     */
    p1Fire() {
        this.data.p1FireTimerId = setInterval(() => {
            if (gameContainer.p1) {
                gameContainer.p1.fire();
            }
        }, 250);
    },
    /**
     * 玩家1飞机停止开火的方法
     */
    p1StopFire() {
        clearInterval(this.data.p1FireTimerId);
    },
    /**
     * 添加敌机的方法
     */
    addEnemy() {
        //创建一个定时器，不停的添加敌机
        setInterval(() => {
            let { maxEnemyCount } = gameConfig;
            let count = maxEnemyCount - gameContainer.enemyList.length;
            for (let i = 0; i < count; i++) {
                let e = new Enemy();
                gameContainer.enemyList.push(e);
            }
        }, 250);
    },
    /**
     * 检测两个对象是否有发生相交，碰撞行为
     * @param {GameObject} a 
     * @param {GameObject} b 
     * @returns {boolean} true代表碰撞，false代表没有碰撞
     */
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
     * 检测子弹与敌机之间的碰撞
     */
    checkBulletAndEnemyCrash() {
        for (let i = gameContainer.bulletList.length - 1; i >= 0; i--) {
            for (let j = gameContainer.enemyList.length - 1; j >= 0; j--) {
                let b = gameContainer.bulletList[i];
                let e = gameContainer.enemyList[j];
                let result = this.checkCrash(b, e);
                if (result) {
                    gameContainer.bulletList.splice(i, 1);
                    gameContainer.enemyList.splice(j, 1);
                    let _boom = new Boom(e.x + e.width / 2, e.y + e.height / 2);
                    gameContainer.boomList.push(_boom);

                    break;
                }
            }
        }
    }
}

gameControl.init();