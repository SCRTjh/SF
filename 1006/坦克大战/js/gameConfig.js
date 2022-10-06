/**
 * 游戏的基本配置信息
 */
const gameConfig = {
    get gameWidth() {
        return document.querySelector("#game").clientWidth;
    },
    get gameHeight() {
        return document.querySelector("#game").clientHeight;
    },
    /**
     * 玩家子弹的集合
     */
    bulletSet: new Set(),
    //最大敌人数量
    // maxEnemyCount: 10,
    // //敌人坦克的集合
    // enemySet: new Set(),

    bulletEnemySet: new Set(),
    bullet2Set: new Set(),
    audioList: new Array(),
}

export default gameConfig;