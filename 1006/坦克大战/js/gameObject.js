/**
 * 所有游戏对象的父类
 */

//横坐标，纵坐标，宽度，高度，图片（根据方向决定），方向

class GameObject {
    constructor(x, y, dir, img) {
        this.x = x;
        this.y = y;
        this.dir = dir;
        this.img = img;
        this.width = this.img.width;
        this.height = this.img.height;
    }
    /**
     * 绘制自己的方法
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}

export default GameObject;