const setRem = () => {
    let x = document.documentElement.clientWidth;
    if (x > 750) {
        x = 750;
    }

    document.documentElement.style.fontSize = x / 375 * 100 + "px";
}

document.addEventListener("DOMContentLoaded", setRem);
window.addEventListener("resize", setRem)