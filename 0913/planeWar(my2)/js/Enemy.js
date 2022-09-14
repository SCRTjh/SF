/**
 * 敌机的构造函数
 */

function Enemy() {


    let temp = ~~(Math.random() * 100);
    if (temp < 5) {
        //大飞机
        this.type = 1;

    } else {
        //打飞机
        this.type = 0;

    }
    //由类型取决定图片,0~1之间随机数
    // this.type = ~~(Math.random() * 2);
    if (this.type == 0) {
        //小飞机
        img = gameControl.data.assertsObject[3];
        this.life = 5;
        this.totalLife = 5;
        this.score = 1;
    } else if (this.type == 1) {
        //大飞机
        img = gameControl.data.assertsObject[4];
        this.life = 2;
        this.totalLife = 2;
        this.score = 5;

    }
    let y = 0 - img.height;
    let x = ~~(Math.random() * (512 - img.width));

    //继承

    GameObject.call(this, x, y, img);

    //随机产生一个速度
    this.speed = ~~(Math.random() * 3) + 3;

}

Enemy.prototype = Object.create(GameObject.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.move = function () {
    this.y += this.speed;

    if (this.y > 768) {
        let index = gameControl.data.enemyList.indexOf(this);
        gameControl.data.enemyList.splice(index, 1);
    }

}
/**
 * 绘制
 * @param {CanvasRenderingContext2D} ctx 
 */
Enemy.prototype.draw = function (ctx) {
    this.move();
    ctx.strokeStyle = "red";
    ctx.strokeRect(this.x, this.y, this.width, 5);
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width * this.life / this.totalLife, 5);


    GameObject.prototype.draw.call(this, ctx);
}

Enemy.prototype.fire = function () {
    let randomNum = ~~(Math.random() * 100);
    if (randomNum <= 2) {
        let b = new EnemyBullet(this.x, this.y + this.height / 2, gameControl.data.assertsObject[17]);
        b.x = this.x + this.width / 2 - b.width / 2
        gameControl.data.EnemyBulletList.push(b); //子弹放集合
    }

}

