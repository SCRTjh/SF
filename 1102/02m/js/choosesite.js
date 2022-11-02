var res ;

$.get("http://www.softeem.xin:9999" + "/plan-info/findById/" + 133, function (result) {
    console.log(result);
    if (result.status == "success") {
        result.data.choose_site = JSON.parse(result.data.choose_site);
        console.log(result.data);
        var price = result.data.price;
        res = result.data;
        console.log(res);


    } else {
        console.log("请求数据失败")
    }
})