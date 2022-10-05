/**
 * 游戏模块的基础对象
 */
class GameObject {
    /**
     * @param {number} x 
     * @param {number} y 
     * @param {HTMLImageElement} img 
     */
    constructor(x, y, img) {
        this.x = x;
        this.y = y;
        this.img = img;
        this.width = this.img.width;
        this.height = this.img.height;
    }

    /**
     * @description 绘制游戏对象
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx) {
        ctx.drawImage(
            this.img,
            this.x,
            this.y,
            this.width,
            this.height
        )
    }
}

export default GameObject;
