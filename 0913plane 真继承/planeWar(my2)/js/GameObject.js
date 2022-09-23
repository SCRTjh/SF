

function GameObject(x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.width = img.width;
    this.height = img.height;
}


/**
 *  把自己画出来 
 * @param {CanvasRenderingContext2D} ctx
 */
GameObject.prototype.draw = function (ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
}