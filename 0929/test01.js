var a = 0;
var b = 1;
console.log(a, b);
var [a, b] = [b, a];
console.log(a, b);

console.log(
    [1, 2, 3, 4].map(item => item ** 2),
    [1, 2, 3, 4].entries()
);

const s = {
    name: "123",
    sex: "男",
    [Symbol("pwd")]: "123456"
}

console.log([...Object.getOwnPropertyNames(s), ...Object.getOwnPropertySymbols(s)]);
console.log(Reflect.ownKeys(s));

let book_proxy = new Proxy((
    () => {
        return {
            name: "《ES6基础系列》",
            price: 56
        }
    }
)(), {
    get(target, p) {
        if (p == "name") {
            return "《ES6入门到懵逼》"
        } else {
            return target[p]
        }
    },
    set(target, p, v) {
        if (p == "price") {
            throw new Error("这是只读属性");
            return;
        } else {
            target[p] = v;
        }
    },
    deleteProperty(target, p) {
        if (p == "price") {
            return;
        } else {
            delete target[p];
        }
    }
})

console.log(
    book_proxy.name
);

let ss = new Set();
ss.add([1]);
ss.add([1]);
console.log([1] === [1]);
console.log(ss.size);


let map = new Map();
map.set([1], "ES6系列");
let con = map.get([1]);
console.log(con);

class Animal {
    constructor(name, sex, age) {
        this.name = name;
        this.sex = sex;
        this.age = age
    }

    run() {
        console.log("跑跑");
    }

}

class Cat extends Animal {
    constructor(name, sex, age) {
        super(name, sex, age)
    }

    eat() {
        console.log("吃东西");
    }


}

let c1 = new Cat('11', '母', 1);

c1.run();



