const musicControl = {
    dom: {
        bgm: document.querySelector("#bgm"),
        musicImg: document.querySelector(".music-img"),
        currentTimeSpan: document.querySelector(".current-time-span"),
        durationSpan: document.querySelector(".duration-span"),
        progress: document.querySelector(".progress"),
        lrcBox: document.querySelector(".lrc-box")
    },
    data: {
        //歌词时间组
        timeArr: [],
        //歌词内容组
        txtArr: []

    },
    bindEvent: function () {
        console.log(this);
        const that = this;
        // 绑定一个加载事件
        this.dom.bgm.addEventListener("canplay", function (event) {
            console.log("事件绑定成功");
            that.dom.durationSpan.innerText = that.formatTime(that.dom.bgm.duration);
        });
        //绑定音频播放的事件
        this.dom.bgm.addEventListener("playing", function () {
            that.dom.musicImg.dataset.aniState = 1;
        });
        //绑定音频的停止事件
        this.dom.bgm.addEventListener("pause", function (event) {
            that.dom.musicImg.dataset.aniState = 0;
        });
        // 绑定图片的点击事件
        this.dom.musicImg.addEventListener("click", function (event) {
            if (that.dom.bgm.paused) {
                that.dom.bgm.play();
            } else {
                that.dom.bgm.pause();
            }
        });
        //绑定音频标签的时间更新事件
        this.dom.bgm.addEventListener("timeupdate", function (event) {
            that.dom.currentTimeSpan.innerText = that.formatTime(that.dom.bgm.currentTime);
            var x = (that.dom.bgm.currentTime / that.dom.bgm.duration * 100) + "%";
            that.dom.progress.style.backgroundSize = x + " 100%";
            //根据时间找歌词
            let i = that.findTimeIndex(that.dom.bgm.currentTime);
            console.log(that.data.txtArr[i]);
            that.dom.lrcBox.innerText = that.data.txtArr[i];
        });
        //绑定进度条的点击事件
        this.dom.progress.addEventListener("click", function (event) {
            var x = event.offsetX / that.dom.progress.clientWidth * that.dom.bgm.duration;
            that.dom.bgm.currentTime = x;
        });
        //绑定键盘按下事件
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
        this.bindEvent();
    },
    formatTime: function (seconds) {
        //196.362449
        return (~~(seconds / 60)).toString().padStart(2, 0) + ":" + (~~(seconds % 60)).toString().padStart(2, 0);
    },
    getTimeArr: function () {
        var reg = /(?<=\[)(\d{2}):(\d{2}\.\d{3})(?=\])/g;
        var temp = ""
        while ((temp = reg.exec(lrc)) != null) {
            this.data.timeArr.push(temp[1] * 60 + +temp[2]);
        }
    },
    getTxtArr: function () {
        var reg = /(?<=\]).*/g;
        this.data.txtArr = lrc.match(reg);
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