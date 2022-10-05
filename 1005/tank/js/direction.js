/**
 * 定义四个方向,模仿枚举
 */


const direction = {
    UP: Symbol(),
    DOWN: Symbol(),
    LEFT: Symbol(),
    RIGHT: Symbol()
}

//将当前的对象冻结后导出
export default Object.freeze(direction);