import Person from "./Person.js";
class Student extends Person{
    constructor(userName,sex){
        super(userName)
        this.sex = sex;
    }
    study(){
        console.log(`${this.sex}学生在学习`);
    }
}

export default Student;