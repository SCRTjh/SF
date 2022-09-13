/**
 * 
 * @param {number} x 横坐标
 * @param {number} y 纵坐标
 * @param {HTMLImageElement} img 对象图片
 */
function Bullet(x, y, img) {
    GameObject.call(this, x, y, img);
    this.speed = 10;
}

Bullet.prototype = Object.create(GameObject.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.moveSelf = function () {
    this.y -= this.speed;
}
