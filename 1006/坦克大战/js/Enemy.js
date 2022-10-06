import GameObject from "./gameObject.js";
import gameAssets from "./gameAssets.js";
import gameConfig from "./gameConfig.js";
import direction from "./direction.js";
import BulletEnemy from "./BulletEnemy.js";
/**
 * 敌机的坦克
 */
class Enemy extends GameObject {
    constructor() {
        let x = ~~(Math.random() * gameConfig.gameWidth);
        let y = ~~(Math.random() * gameConfig.gameHeight);
        //随机生成方向，由方向决定图片
        // let list = [direction.UP, direction.DOWN, direction.LEFT, direction.RIGHT];
        // let temp = ~~(Math.random() * 4);
        // let dir = list[temp];
        // let dir = [direction.UP, direction.DOWN, direction.LEFT, direction.RIGHT][~~(Math.random() * 4)];

        let dir = Object.values(direction)[~~(Math.random() * 4)];
        let img = null;
        if (dir == direction.LEFT) {
            img = gameAssets.imgObjectMap.get("enemy1L.gif");
        }
        else if (dir == direction.RIGHT) {
            img = gameAssets.imgObjectMap.get("enemy1R.gif");
        }
        else if (dir == direction.UP) {
            img = gameAssets.imgObjectMap.get("enemy1U.gif");
        }
        else if (dir == direction.DOWN) {
            img = gameAssets.imgObjectMap.get("enemy1D.gif");
        }
        super(x, y, dir, img);
        this.speed = 3;
        this.isFire = false;
    }
    /**
     * 坦克移动
     */
    move() {
        if (~~(Math.random() * 100) < 2) {
            this.adjustDir();
        }
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

        //防止出屏幕
        if (this.x < 0) {
            this.x = 0;
            this.adjustDir();
        }
        else if (this.x > gameConfig.gameWidth - this.width) {
            this.x = gameConfig.gameWidth - this.width;
            this.adjustDir();
        }
        if (this.y < 0) {
            this.y = 0;
            this.adjustDir();
        }
        else if (this.y > gameConfig.gameHeight - this.height) {
            this.y = gameConfig.gameHeight - this.height
            this.adjustDir();
        }
    }

    /**
     * 重写draw方法
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx) {
        this.move();
        super.draw(ctx);
        this.fire();
    }

    //随机调整坦克的方向
    adjustDir() {
        //let dir = Object.values(direction)[~~(Math.random() * 4)]
        //这个方向不能跟之前的方向保持一致
        let dir = null;
        do {
            dir = Object.values(direction)[~~(Math.random() * 4)];
        } while (dir == this.dir);
        this.dir = dir;
        if (this.dir == direction.LEFT) {
            this.img = gameAssets.imgObjectMap.get("enemy1L.gif");
        }
        else if (this.dir == direction.RIGHT) {
            this.img = gameAssets.imgObjectMap.get("enemy1R.gif");
        }
        else if (this.dir == direction.UP) {
            this.img = gameAssets.imgObjectMap.get("enemy1U.gif");
        }
        else if (this.dir == direction.DOWN) {
            this.img = gameAssets.imgObjectMap.get("enemy1D.gif");
        }
    }

    static maxEnemyCount = 10;
    // 敌方坦克的集合
    static EnemySet = new Set();
    /**
         * 添加敌方坦克
         */
    static addThis() {
        if (Enemy.EnemySet.size < Enemy.maxEnemyCount) {
            let count = Enemy.maxEnemyCount - Enemy.EnemySet.size;
            for (let i = 0; i < count; i++) {
                let e = new Enemy();
                Enemy.EnemySet.add(e);
            }
        }
    }

    /**
     * 发射子弹
     */
    fire() {
        if (this.isFire === false) {
            let b = new BulletEnemy(this.x, this.y, this.dir);
            b.x = this.x + this.width / 2 - b.width / 2;
            b.y = this.y + this.height / 2 - b.height / 2;
            gameConfig.bulletEnemySet.add(b);
            this.isFire = true;
            setTimeout(() => {
                this.isFire = false;
            }, 1000)
        }

    }
}
export default Enemy;