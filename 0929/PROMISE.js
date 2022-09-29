const km1 = () => {
    console.log("考科目一");
    let p = new Promise((res, rej) => {
        setTimeout(() => {
            let result1 = ~~(Math.random() * 15) + 85;
            if (result1 >= 90) {
                res(result1);
            } else {
                rej(result1)
            }
        }, 2000);
    });
    return p;
}

const km2 = () => {
    console.log("考科目二");
    let p = new Promise((res, rej) => {
        setTimeout(() => {
            let result1 = ~~(Math.random() * 15) + 85;
            if (result1 >= 90) {
                res(result1);
            } else {
                rej(result1)
            }
        }, 2000);
    });
    return p;
}

const km3 = () => {
    console.log("考科目三");
    let p = new Promise((res, rej) => {
        setTimeout(() => {
            let result1 = ~~(Math.random() * 15) + 85;
            if (result1 >= 90) {
                res(result1);
            } else {
                rej(result1)
            }
        }, 2000);
    });
    return p;
}

const km4 = () => {
    console.log("考科目四");
    let p = new Promise((res, rej) => {
        setTimeout(() => {
            let result1 = ~~(Math.random() * 15) + 85;
            if (result1 >= 90) {
                res(result1);
            } else {
                rej(result1)
            }
        }, 2000);
    });
    return p;
}

let p1 = km1();
p1.then((result) => {
    console.log(`成功,${result}`);
    return km2();
}).then((result) => {
    console.log(`成功,${result}`);
    return km3();
}).then((result) => {
    console.log(`成功,${result}`);
    return km4();
}).catch((error) => {
    console.log(`挂咯,${error}`);
})

