/**
 * 背景对象的构造函数
 * @author 汤俊豪
 * @date 2022-9-13
 */


/**
 * 
 * @param {number} x 横坐标
 * @param {number} y 纵坐标
 * @param {HTMLImageElement} img 对象图片
 */
function Background(x, y, img) {
    GameObject.call(this, x, y, img);
    this.speed = 5;
}

Background.prototype = Object.create(GameObject.prototype);
Background.prototype.constructor = Background;

/**
 * 背景移动的方法
 */
Background.prototype.move = function () {
    this.y += this.speed;
    if (this.y >= 0) {
        this.y = -768;
    }

}

/**
 * 绘制背景
 * @param {CanvasRenderingContext2D} ctx
 */
Background.prototype.draw = function (ctx) {
    this.move();
    // ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    this.__proto__.__proto__.draw.call(this, ctx);
}


