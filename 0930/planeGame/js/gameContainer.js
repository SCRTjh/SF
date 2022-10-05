/**
 * 游戏容器，专门存入在页面上面所需要使用的游戏对象
 * 所有gameContainer里面的游戏对象都需要画出来
 */
const gameContainer = {
    /** 
     * 背景
     * @type {import("./Background.js").default} 
     * */
    bg: null,
    /** 
     * 玩家1
     * @type {import("./Hero.js").default} 
     * */
    p1: null,
    /** 
     * 子弹的集合
     * @type {import("./Bullet.js").default[]} 
     * */
    bulletList: [],
    /**
     * 敌机的集合
     * @type {import("./Enemy.js").default[]}
     */
    enemyList: [],
    /**
     * 爆炸动画的集合
     * @type {import("./Boom.js").default[]}
     */
    boomList: []
}





export default gameContainer;