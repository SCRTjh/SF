/**
 * GameObject所有游戏对象的父类
 */

//横纵坐标，高宽，图片


class GameObject {
    constructor(x, y, direc, img) {
        this.x = x;
        this.y = y;
        this.direc = direc;
        this.img = img;
        this.width = this.img.width;
        this.height = this.img.height;
    }

    /**
     * 绘制自己的方法
     * @param {CanvaxRenderingContext2d} ctx 
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }


}

export default GameObject