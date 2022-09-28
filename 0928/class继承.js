// <!-- 现在几个动物分别小猫Cat和小狗Dog,Cat构造函数里面有
// 性别（sex），年龄（age），昵称 （nickName）和体重（weight）四个属性，
// 而Dog构造函数里面有性别，年龄，昵称 ，
// 和身高 （height）四个属性，猫与狗有一个共同的方法叫sleep睡觉，但是猫有一个方法 `miao` ,
// 狗有一个方法 叫 `wang `
// * 现在请列举出Cat与Dog的构造函数，并且提取公共部分使用继承 
// * 突然之间又有一个小动物，农家田园犬Pastoral，它也是属于狗的类别，也具备Dog所有的属性，
// 但是它还有一个方法是看门 `janitor` 
// 现在请创建 Pastoral 的构造函数，并实现继承关系 -->


class Animal {
    constructor(sex, age, nickName) {
        this.sex = sex;
        this.age = age;
        this.nickName = nickName;
    }

    sleep() {
        console.log("睡觉");
    }

}

class Cat extends Animal {
    constructor(sex, age, nickName, weight) {
        super(sex, age, nickName);
        this.weight = weight;
    }

    miao() {
        console.log("miaomiao");
    }
}

class Dog extends Animal {
    constructor(sex, age, nickName, height) {
        super(sex, age, nickName);
        this.height = height;
    }

    wang() {
        console.log("wangwang");
    }

}

class Pastoral extends Dog {
    constructor(sex, age, nickName, height) {
        super(sex, age, nickName, height);
    }

    janitor() {
        console.log("看门");
    }

}

let p1 = new Pastoral("male", 1, "123", 40);
p1.sleep();
p1.wang();
p1.janitor();
console.log(p1.height);