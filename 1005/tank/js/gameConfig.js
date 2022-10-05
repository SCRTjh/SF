
/**
 * 游戏的基本配置
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

    enemeyBulletSet: new Set(),

    fireAudioList: [],


}

export default gameConfig;