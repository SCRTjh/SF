// var baseURL = "http://192.168.103.253:9999";
var baseURL = "http://www.softeem.xin:9999";


function formatDataTime(oldTime) {
    var d = new Date(oldTime);

    var year = d.getFullYear();
    var month = (d.getMonth() + 1).toString().padStart(2, "0");
    var day = d.getDay().toString().padStart(2, "0");

    var hour = d.getHours().toString().padStart(2, "0");
    var minue = d.getMinutes().toString().padStart(2, "0");
    var second = d.getSeconds().toString().padStart(2, "0");

    return [year, month, day].join("-") + " " + [hour, minue, second].join(":");
}





