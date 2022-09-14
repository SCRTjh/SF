/**
 * 
 * @param {number} x 横坐标
 * @param {number} y 纵坐标
 * @param {HTMLImageElement} img 对象图片
 */
function Bullet(x, y, img) {
    GameObject.call(this, x, y, img);
    this.speed = 10;
    this.width = img.width / 2;
    this.height = img.height / 2;

}

Bullet.prototype = Object.create(GameObject.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.moveSelf = function () {
    this.y -= this.speed;
}


Bullet.prototype.draw = function (ctx) {
    this.moveSelf();
    this.__proto__.__proto__.draw.call(this, ctx);
    if (this.y < -140) {   //子弹到达边缘消失
        // delete that.data.bulletList[index];
        let index = gameControl.data.bulletList.indexOf(this);
        gameControl.data.bulletList.splice(index, 1);
        // delete gameControl.data.bulletList[index];
    }
}
