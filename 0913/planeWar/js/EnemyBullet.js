/**
 * 
 * @param {number} x 横坐标
 * @param {number} y 纵坐标
 * @param {HTMLImageElement} img 对象图片
 */
function EnemyBullet(x, y, img) {
    GameObject.call(this, x, y, img);
    this.speed = 10;
    this.width = img.width / 2;
    this.height = img.height / 2;

}

EnemyBullet.prototype = Object.create(GameObject.prototype);
EnemyBullet.prototype.constructor = EnemyBullet;

EnemyBullet.prototype.moveSelf = function () {
    this.y += this.speed;
}


EnemyBullet.prototype.draw = function (ctx) {
    this.moveSelf();
    this.__proto__.__proto__.draw.call(this, ctx);
    if (this.y > 878) {   //子弹到达边缘消失
        // delete that.data.EnemyBulletList[index];
        let index = gameControl.data.EnemyBulletList.indexOf(this);
        gameControl.data.EnemyBulletList.splice(index, 1);
        // delete gameControl.data.EnemyBulletList[index];
    }
}