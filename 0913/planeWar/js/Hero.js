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
}

Hero.prototype = Object.create(GameObject.prototype);
Hero.prototype.constructor = Hero;

/**
 * 玩家飞机发射子弹的方法
 */
Hero.prototype.fire = function () {
    let b = new Bullet(this.x, this.y - this.height, gameControl.data.assertsObject[2]);
    gameControl.data.bulletList.push(b); //子弹放集合
}


