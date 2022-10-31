import Person from "./Person.js";

export default class Student extends Person {
    constructor(userName, sex) {
        super(userName);
        this.sex = sex;
    }
    study() {
        setTimeout(() => {
            console.log(`${this.sex}学生在学习`);
        }, 0);
    }
}