let s = document.querySelector(".site-list");

render();

function render() {

    let strHTML = template("tempSite", {
        arr: sites
    })
    s.innerHTML = strHTML;
}


s.onclick = function (e) {
    if (e.target.matches(".site3")) {
        e.target.className = "site1";
    } else if (e.target.matches(".site1")) {
        e.target.className = "site3";
    } else if (e.target.matches(".site4")) {
        e.target.className = "site3";
    }

}


