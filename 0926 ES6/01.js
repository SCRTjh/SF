let stuInfo = {
    stuName: "张三",
    age: 18,
    telPhone: {
        price: 1999,
        brand: "小米"
    }
}

let { stuName, age, telPhone: { price, brand } } = stuInfo;


console.log(stuName, price);