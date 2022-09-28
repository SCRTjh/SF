let obj = {
    userName: "张三",
    sex: "男",
    age: 18,
    address: "湖北武汉",

    [Symbol.iterator]: function* () {
        let arr = Object.keys(this);
        let index = 0;
        while (index < arr.length) {
            yield this[arr[index]];
            index++;
        }

        // for(let item in this){
        //     yield this[item];
        // }

    }
}

for (let item of obj) {
    console.log(item);
}