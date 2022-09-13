/**
 * 小型敌机对象的构造函数
 * @author 汤俊豪
 * @date 2022-9-13
 */


/**
 * 
 * @param {number} x 横坐标
 * @param {number} y 纵坐标
 * @param {HTMLImageElement} img 对象图片
 */
function EnemySmall(x, y, img) {
    GameObject.call(this, x, y, img);
    this.width = img.width;
    this.speed = 5;
    this.hp = 2;
}

EnemySmall.prototype = Object.create(GameObject.prototype);
EnemySmall.prototype.constructor = EnemySmall;


EnemySmall.prototype.moveSelf = function () {
    this.y += this.speed;
}

