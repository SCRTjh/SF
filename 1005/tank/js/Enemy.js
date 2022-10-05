import GameObject from "./GameObject.js";
import gameAsserts from "./gameAsserts.js";
import gameConfig from "./gameConfig.js";
import direction from "./direction.js";
import EnemyBullet from "./EnemyBullet.js";
/**
 * 敌机的坦克
 */


class Enemy extends GameObject {
    constructor() {
        let x = ~~(Math.random() * gameConfig.gameWidth);
        let y = ~~(Math.random() * gameConfig.gameHeight);
        //随机生成方向
        // let list = [direction.LEFT,direction.DOWN,direction.UP,direction.RIGHT];
        // let temp = ~~(Math.random()*4);
        // let direc = list[temp];

        let direc = Object.values(direction)[~~(Math.random() * 4)];
        let img = null;
        if (direc == direction.LEFT) {
            img = gameAsserts.imgObjMap.get("enemy1L.gif");
        }
        else if (direc == direction.RIGHT) {
            img = gameAsserts.imgObjMap.get("enemy1R.gif");
        }
        else if (direc == direction.UP) {
            img = gameAsserts.imgObjMap.get("enemy1U.gif");
        }
        else if (direc == direction.DOWN) {
            img = gameAsserts.imgObjMap.get("enemy1D.gif");
        }

        super(x, y, direc, img);
        this.speed = 3;
    }

    /**
     * 坦克移动
     */
    move() {
        if (~~(Math.random() * 100) < 5) {
            this.adjustDirec();
        }
        if (this.direc == direction.LEFT) {
            this.x -= this.speed
        }
        else if (this.direc == direction.RIGHT) {
            this.x += this.speed
        }
        else if (this.direc == direction.UP) {
            this.y -= this.speed
        }
        else if (this.direc == direction.DOWN) {
            this.y += this.speed
        }

        //防止出界
        if (this.x < 0) {
            this.x = 0;
            this.adjustDirec();
        }
        else if (this.x > gameConfig.gameWidth - this.width) {
            this.x = gameConfig.gameWidth - this.width;
            this.adjustDirec();
        }
        else if (this.y < 0) {
            this.y = 0;
            this.adjustDirec();
        }
        else if (this.y > gameConfig.gameHeight - this.height) {
            this.y = gameConfig.gameHeight - this.height;
            this.adjustDirec();
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

    fire() {
        if (~~(Math.random() * 100) < 1) {
            let b = new EnemyBullet(this.x, this.y, this.direc);
            b.x = this.x + this.width / 2 - b.width / 2;
            b.y = this.y + this.height / 2 - b.height / 2;
            gameConfig.enemeyBulletSet.add(b);
        }
    }

    adjustDirec() {
        //随机得到一个方向
        //这个方向不同于之前
        let direc = null;
        do {
            direc = Object.values(direction)[~~(Math.random() * 4)];
        } while (direc == this.direc);
        this.direc = direc;

        if (this.direc == direction.LEFT) {
            this.img = gameAsserts.imgObjMap.get("enemy1L.gif");
        }
        else if (this.direc == direction.RIGHT) {
            this.img = gameAsserts.imgObjMap.get("enemy1R.gif");
        }
        else if (this.direc == direction.UP) {
            this.img = gameAsserts.imgObjMap.get("enemy1U.gif");
        }
        else if (this.direc == direction.DOWN) {
            this.img = gameAsserts.imgObjMap.get("enemy1D.gif");
        }
    }




    static maxEnemyCount = 10;

    static enemySet = new Set();

    /**
     * 添加敌方坦克
     */
    static addSelf() {
        if (Enemy.enemySet.size < Enemy.maxEnemyCount) {
            let count = Enemy.maxEnemyCount - Enemy.enemySet.size;
            for (let i = 0; i < count; i++) {
                let e = new Enemy();
                Enemy.enemySet.add(e);
            }
        }
    }


}

export default Enemy;