import GameObject from "./GameObject.js";
import assetsConfig from "./assetsConfig.js";

class Background extends GameObject {
    constructor() {
        let img = assetsConfig.imgList[0]
        super(0, -img.height / 2, img);
        this.speed = 1;
    }

    /**
     * 背景移动的方法
     */
    move() {
        this.y += this.speed;
        if (this.y > 0) {
            this.y = -this.height / 2;
        }
    }

    /**
     * 重写draw的方法
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx){
        this.move();
        super.draw(ctx);
    }
}


export default Background;