class Person {
    constructor(userName) {
        this.userName = userName;
    }
    sayHello() {
        setTimeout(() => {
            console.log(`大家好，我叫${this.userName}`);
        }, 1000);
    }
}

//现在用的是ESModule，不是CommonJS模块 
export default Person;