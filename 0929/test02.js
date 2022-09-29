const promise = new Promise((resolve, reject) => {
    console.log(1);
    resolve(3);
    console.log(2);
    reject(4)
})
promise.then((res) => {
    console.log(res);
}).catch(err => {
    console.log(err);
})
console.log(5);


const list = [
    { id: 3, name: "张三丰" },
    { id: 5, name: "张无忌" },
    { id: 13, name: "杨逍" },
    { id: 33, name: "殷天正" },
    { id: 12, name: "赵敏" },
    { id: 97, name: "周芷若" },
]

console.log(list.filter(item => item.name.startsWith("杨")));
console.log(list.filter(item => item.name.includes("天")));
let zid = list.filter((item) => {
    return item.name == "周芷若"
})
console.log(zid[0].id);

let newArr = [];
for (let i of list) {
    let newObj = {};
    for (let j in i) {
        if (j == "id") {
            newObj[j] = i[j] * 2;
        } else {
            newObj[j] = i[j];
        }
    }
    newObj["updateTime"] = Date.now();
    newArr.push(newObj);
}

console.log(newArr);
