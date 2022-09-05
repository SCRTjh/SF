const musicControl = {
    dom: {
        // 音乐
        bgm: document.querySelector("#bgm"),
        //歌词列表
        textList: document.querySelector(".text-list"),
        //歌词
        texts: null,
        //歌词盒子
        textBox: document.querySelector(".text-box"),

    },
    data: {
        //歌词时间组
        timeArr: [],
        //歌词内容组
        txtArr: []
    },
    bindEvent: function () {
        let that = this;
        this.dom.bgm.addEventListener("canplay", function (event) {
            console.log("事件绑定成功");
            that.dom.texts[0].classList.add("current");
        });
        //取消默认滚轮事件
        this.dom.textBox.addEventListener("mouseover", function (event) {
            that.dom.textBox.onmousewheel = function () {
                return false;
            }
            event.stopPropagation();
        }, false);
        //音乐时间更新事件
        this.dom.bgm.addEventListener("timeupdate", function () {
            var x = that.findTimeIndex(that.dom.bgm.currentTime);
            that.dom.texts.forEach(i => {
                i.classList.remove("current")
            })
            that.dom.texts[x].classList.add("current");
            that.dom.textBox.scrollTop = that.dom.texts[x].offsetHeight * x;
        });
        //键盘事件
        document.addEventListener("keydown", function (event) {
            console.log(event.keyCode);
            if (!event.repeat) {
                switch (event.keyCode) {
                    case 37: that.dom.bgm.currentTime -= 5; break;
                    case 39:
                        let x = that.dom.bgm.currentTime + 5;
                        if (x > that.dom.bgm.duration) {
                            that.dom.bgm.currentTime = that.dom.bgm.currentTime;
                        } else {
                            that.dom.bgm.currentTime = x;
                        }
                        break;
                    case 32:
                        if (that.dom.bgm.paused) {
                            that.dom.bgm.play(); break;
                        } else {
                            that.dom.bgm.pause(); break;
                        }
                }
            }
        })

    },
    start: function () {
        this.render();
        this.bindEvent();
    },
    getTimeArr: function () {
        var reg = /(?<=\[)(\d{2}):(\d{2}\.\d{3})(?=\])/g;
        var temp = ""
        while ((temp = reg.exec(musicLrc)) != null) {
            this.data.timeArr.push(temp[1] * 60 + +temp[2]);
        }
    },
    getTxtArr: function () {
        var reg = /(?<=\]).*/g;
        this.data.txtArr = musicLrc.match(reg);
    },
    render: function () {
        this.dom.textList.innerHTML = template("temp1", {
            arr: this.data.txtArr
        })
        this.dom.texts = document.querySelectorAll(".text-list>li");
    },
    findTimeIndex: function (time) {
        for (var i = 0; i < this.data.timeArr.length; i++) {
            if (time < this.data.timeArr[i]) {
                break
            }
        }
        if (i == 0) {
            return i
        } else {
            return i - 1
        }

    }



}
musicControl.getTimeArr();
musicControl.getTxtArr();
musicControl.start();