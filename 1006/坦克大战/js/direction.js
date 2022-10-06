/**
 * 定义四个方向
 */
const direction = {
    /**
     * 上
     */
    UP: Symbol(),
    /**
     * 下
     */
    DOWN: Symbol(),
    /**
     * 左
     */
    LEFT: Symbol(),
    /**
     * 右
     */
    RIGHT: Symbol(),
}
//冻结以后再导出，别修改不了这个对象
export default Object.freeze(direction);