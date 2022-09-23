/**
 * 英雄对象的构造函数
 * @author 汤俊豪
 * @date 2022-9-13
 */


/**
 * 
 * @param {number} x 横坐标
 * @param {number} y 纵坐标
 * @param {HTMLImageElement} img 对象图片
 */
function Hero(x, y, img) {
    GameObject.call(this, x, y, img);
    this.life = 10;
    this.totalLife = 10;
    //创建一个音频的资源池
    this.audioList = [];
    while (this.audioList.length < 10) {
        let audio = new Audio();
        audio.src = "./gameMusic/fire_bullet.mp3";
        this.audioList.push(audio);

    }
}

Hero.prototype = Object.create(GameObject.prototype);
Hero.prototype.constructor = Hero;

/**
 * 玩家飞机发射子弹的方法
 */
Hero.prototype.fire = function () {
    if (gameControl.data.score < 50) {
        let b = new Bullet(this.x, this.y - this.height / 2, gameControl.data.assertsObject[2]);
        b.x = this.x + this.width / 2 - b.width / 2
        gameControl.data.bulletList.push(b); //子弹放集合
    } else if (gameControl.data.score >= 50) {
        let b1 = new Bullet(this.x, this.y - this.height / 2, gameControl.data.assertsObject[2]);
        let b2 = new Bullet(this.x, this.y - this.height / 2, gameControl.data.assertsObject[2]);

        b1.x = this.x + this.width / 2 - b1.width / 4;
        b2.x = this.x + this.width / 2 - b2.width / 4 * 3;

        gameControl.data.bulletList.push(b1); //子弹放集合
        gameControl.data.bulletList.push(b2); //子弹放集合

    }


    let audio = this.audioList.shift();
    audio.play();
    this.audioList.push(audio);

}

/**
 * 
 * @param {CanvasRenderingContext2D} ctx 
 */
Hero.prototype.draw = function (ctx) {
    ctx.strokeStyle = "red";
    ctx.strokeRect(this.x, this.y + this.height, this.width, 5);
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y + this.height, this.width * this.life / this.totalLife, 5);


    GameObject.prototype.draw.call(this, ctx)
}


