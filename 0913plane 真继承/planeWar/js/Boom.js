
/**
 * 爆炸的构造函数
 * @param {number} x 
 * @param {number} y 
 */
function Boom(x, y) {
    //提取第5张到第10张的图片
    this.imgs = gameControl.data.assertsObject.slice(5, 15);
    //继承
    GameObject.call(this, x, y, this.imgs[0]);
    this.width = this.width / 3;
    this.height = this.height / 3;
    this.imgIndex = 0;


}

Boom.prototype = Object.create(GameObject.prototype);
Boom.prototype.constructor = Boom;


/**
 * 绘制爆炸动画
 * @param {CanvaxRenderingContext2D} ctx 
 */
Boom.prototype.draw = function (ctx) {
    ctx.drawImage(this.imgs[~~(this.imgIndex)], this.x, this.y, this.width, this.height);
    this.imgIndex += 0.5;
    if (this.imgIndex >= this.imgs.length) {
        let index = gameControl.data.boomList.indexOf(this);
        gameControl.data.boomList.splice(index, 1);
    }
}