var obj = {
    userName: "张三",
    age: 18,
    hobbys: ["看书", "睡觉", "玩游戏"]
}



let { userName, age, hobbys: [h1, h2, h3] } = obj;

console.log(userName, h1);