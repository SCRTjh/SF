let book_proxy = Proxy.revocable((() => {
    return {
        name: "《ES6基础系列》",
        price: 56
    }
})(), {
    get(target, p) {
        if (p == "name") {
            return "《ES6入门到懵逼》";
        } else {
            return target[p];
        }
    },
    set(target, p) {
        if (p == "price") {
            throw new Error("该属性为只读属性");
            // return;
        } else {
            target[p] = v
        }
    },
    deleteProperty(target, p, v) {
        if (p == "price") {
            throw new Error("该属性为只读属性");
            // return false;
        } else {
            return delete target[p];
        }
    }
})

console.log(book_proxy.proxy.name);
delete book_proxy.proxy.price;