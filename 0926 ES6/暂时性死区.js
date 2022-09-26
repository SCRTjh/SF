let a = 123;

{
    console.log(a);

    let a = 456;

}

//暂时性死区时因为代码的书写不当造成的问题

function aaa() {
    console.log("aa");
}
console.log(typeof aaa); //function
