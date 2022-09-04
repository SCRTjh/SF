var pianonControl = {
    dom: {
        pianon: document.querySelector(".pianon"),

    },
    data: {

    },
    bindEvent: function () {
        that = this;
        //键盘事件
        document.addEventListener("keydown", function (event) {
            let kcode = String.fromCharCode(event.keyCode).toLowerCase();
            if (/[sdfghjkleryui]/.test(kcode) && !event.repeat) {
                let pianonKey = document.querySelector('div[data-key="' + kcode + '"]');
                let allstatus = document.querySelectorAll("div[data-status]");
                allstatus.forEach((i, index) => {
                    allstatus[index].dataset.status = "0";
                })
                pianonKey.dataset.status = "1";
                pianonKey.click();
            }
        })

        //事件委托
        this.dom.pianon.addEventListener("click", function (event) {
            if (event.target.matches("div[data-src]")) {
                let aud = document.createElement("audio");
                aud.src = event.target.dataset.src;
                aud.play();

                console.log(event.target.dataset.status);

            }
        })


    },
    start: function () {
        this.bindEvent();
    }
};


pianonControl.start();