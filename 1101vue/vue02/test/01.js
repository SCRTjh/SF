/*
let obj = {
    $data: {
        girlName:"小红"
    }
}
console.log(obj.$data.girlName);
console.log(obj.girlName);
*/

let obj = new Proxy((() => {
    return {
        $data: {
            girlName: "小红"
        }
    }
})(), {
    get(target, p) {
        if (p.startsWith("$")) {
            return target[p];
        }
        else {
            return target.$data[p];
        }
    },
    defineProperty(){
        //合法的东西我才赋值 ，不合法，我不要
    }
})

console.log(obj.$data.girlName);
console.log(obj.girlName);
