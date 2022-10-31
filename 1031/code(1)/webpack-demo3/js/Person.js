export default class Person {
    constructor(userName) {
        this.userName = userName;
    }
    sayHello() {
        console.log(`大家好，我叫${this.userName}`);
    }
}