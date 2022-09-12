/**
 * index.js的页面代码
 * @author 汤俊豪
 * 
 */

let musicControl = {
    dom: {
        /** @type {HTMLUListElement} */
        musicListBox: document.querySelector(".music-list-box"),
        /**@type {HTMLImageElement} */
        menuImg: document.querySelector(".menu-img"),
        /**@type {HTMLDivElement} */
        leftMenu: document.querySelector(".left-menu"),
        /**@type {HTMLAudioElement} */
        bgm: document.querySelector("#bgm"),
        /**@type {{HTMLDivElement}} */
        currentTimeBox: document.querySelector(".current-time-box"),
        /**@type {{HTMLDivElement}} */
        progress: document.querySelector(".progress"),
        /**@type {{HTMLDivElement}} */
        durationBox: document.querySelector(".duration-box"),
        /** @type {HTMLUListElement} */
        lrcUl: document.querySelector(".lrc-ul"),
        /**@type {HTMLCanvasElement} */
        c1: document.querySelector("#c1"),
        iconP: document.querySelector("#iconP"),
        txtList: null,
        /**@type {HTMLSpanElement} */
        playModeSpan: document.querySelector("#play-model-span"),
        volumeBtn: document.querySelector(".icon-sound-fill"),
        /**@type {HTMLDivElement} */
        volumeBox: document.querySelector(".volume-box"),
        /**@type {HTMLDivElement} */
        volumeBar: document.querySelector(".volume-box>div"),
        mobileRecord: document.querySelector("#record-img"),

    },
    data: {
        APIURL: "http://www.softeem.xin:8888/public/musicData/musicData.json",
        musicList: [],
        // BASEURL: "http://www.softeem.xin:8888/public/musicData/",
        // BASEURL: "http://192.168.90.1:8080/musicData/",
        BASEURL: "http://192.168.101.250:8889/musicData/",
        // 代表当前播放音乐的索引
        _currentIndex: -1,
        //歌词时间
        lrcTimeArr: [],
        //歌词内容
        lrcTxtArr: [],
        //播放模式
        playMode: 0
    },
    bindEvent: function () {
        let that = this;
        // 菜单点击事件
        this.dom.menuImg.addEventListener("click", function (event) {
            let show = that.dom.leftMenu.dataset.show;
            if (show == "0") {
                that.dom.leftMenu.dataset.show = "1";
            } else {
                that.dom.leftMenu.dataset.show = "0";
            }
        });

        //当切换音乐时,音乐时间对上
        this.dom.bgm.addEventListener("loadedmetadata", function (event) {
            let str = that.formatSecond(that.dom.bgm.duration);
            that.dom.durationBox.innerText = str;
        });

        //播放时间更新事件
        this.dom.bgm.addEventListener("timeupdate", function (event) {
            let str = that.formatSecond(that.dom.bgm.currentTime);
            that.dom.currentTimeBox.innerText = str;

            //设置进度条
            let percent = that.dom.bgm.currentTime / that.dom.bgm.duration * 100 + "%";
            that.dom.progress.style.backgroundSize = percent + " 100%";

            //让歌词滚动
            for (var i = 0; i < that.data.lrcTimeArr.length; i++) {
                that.dom.txtList[i].dataset.current = "0";
                if (that.dom.bgm.currentTime < that.data.lrcTimeArr[i]) {
                    break;
                }
            }
            if (i > 0) {
                i--;
            }
            that.dom.txtList[i].dataset.current = "1";
            that.dom.lrcUl.style.marginTop = - that.dom.lrcUl.children[i].offsetTop + "px";

        });

        //进度条点击事件
        this.dom.progress.addEventListener("click", function (event) {
            if (that.dom.bgm.src) {
                that.dom.bgm.currentTime = event.offsetX / that.dom.progress.clientWidth * that.dom.bgm.duration;
            }
        });
        this.dom.bgm.addEventListener("playing", function () {
            that.dom.mobileRecord.style.display = "block";
            that.dom.mobileRecord.style.animationPlayState = "running";
            that.dom.iconP.classList.add("icon-zanting");
            that.dom.iconP.classList.remove("icon-bofang");

        });
        this.dom.bgm.addEventListener("pause", function () {
            that.dom.mobileRecord.style.animationPlayState = "paused";
            that.dom.iconP.classList.remove("icon-zanting");
            that.dom.iconP.classList.add("icon-bofang");

        });

        // onclick="musicControl.data.currentIndex={{index}}"  
        this.dom.musicListBox.addEventListener(("click"), function (event) { //音乐盒点击切歌
            if (event.target.matches("li")) {
                let index = event.target.dataset.index;
                that.data.currentIndex = index;
            }
        });

        this.dom.bgm.addEventListener("ended", function (event) {
            if (that.data.playMode == 0) {
                that.data.currentIndex++;
            } else if (that.data.playMode == 1) {
                do {
                    let temp = ~~(Math.random() * that.data.musicList.length);
                } while (that.data.currentIndex == temp) {
                    that.data.currentIndex = temp;
                }

            }
        })

        //音量
        this.dom.volumeBtn.addEventListener("click", function () {
            console.log(that.dom.volumeBox.dataset);
            that.dom.volumeBox.dataset.hidden == "1" ?
                that.dom.volumeBox.dataset.hidden = "0" :
                that.dom.volumeBox.dataset.hidden = "1";
        })

        this.dom.volumeBar.addEventListener("click", function (event) {
            that.dom.volumeBar.style.backgroundSize = event.offsetX / that.dom.volumeBar.offsetWidth * 100 + "% " + "100%";
            that.dom.bgm.volume = event.offsetX / that.dom.volumeBar.offsetWidth;
        })


    },

    /**
     * 格式化秒数为固定格式
     * @param {number|string} seconds 
     * @returns {string}
     */
    formatSecond: function (seconds) {
        let str1 = (~~(seconds / 60)).toString().padStart(2, 0);
        let str2 = (~~(seconds % 60)).toString().padStart(2, 0);
        return str1 + ":" + str2;
    },

    /**
         * 通过Ajax获取音乐列表
         */
    getMusicList: function () {
        let that = this;
        AjaxHelper.get(this.data.APIURL, function (result) {
            // 将请求的结果缓存下来
            localStorage.setItem("musicListJson", result);
            let arr = JSON.parse(result);
            console.log(arr);
            that.data.musicList = arr;
            that.rederMusicList();
        })

    },
    rederMusicList: function () {
        let that = this;
        let htmlStr = template("temp1", {
            musicList: this.data.musicList,
            BASEURL: this.data.BASEURL
        });
        that.dom.musicListBox.innerHTML = htmlStr;
    },
    /**
     * 根据歌词提取歌词内容
     * @param {string} lrcText  歌词的字符串
     * @returns {string[]} 返回提取的歌词内容
     */
    getLrcTextArr: function (lrcText) {
        let reg = /(?<=\]).*/g;
        return lrcText.match(reg);
    },
    /**
     * 根据歌词提取歌词时间
     * @param {string} lrcText 歌词的字符串
     * @returns {number[]} 返回提取的歌词的时间组
     */
    getLrcTimeArr: function (lrcText) {
        let reg = /(?<=\[)(\d{2}):(\d{2}\.\d{3})(?=\])/g;
        let temp = "";
        let arr = [];
        while ((temp = reg.exec(lrcText)) != null) {
            let totalTime = temp[1] * 60 + +temp[2];
            arr.push(totalTime);
        }
        return arr;
    },
    changePlayMode: function () {
        let arr = ["icon-shunxubofang", "icon-random", "icon-24gl-repeatOnce2"]
        //0顺序，1随机，2单曲
        this.data.playMode++;
        if (this.data.playMode > 2) {
            this.data.playMode = 0;
        }
        this.dom.playModeSpan.className = "iconfont " + arr[this.data.playMode];
        this.dom.bgm.loop = this.data.playMode == 2;
    },
    start: function () {

        this.bindEvent();
        //缓存请求
        let musicListJson = localStorage.getItem("musicListJson");
        if (musicListJson) {
            // 有缓存
            this.data.musicList = JSON.parse(musicListJson);
            this.rederMusicList();
        } else {
            // 没有缓存
            this.getMusicList();
        }
        this.draw();
    },
    /**
     * 绘制音频
     */
    draw: function () {
        let that = this;
        let ctx = this.dom.c1.getContext("2d");
        let gradient = ctx.createLinearGradient(0, 0, 0, this.dom.c1.height);
        gradient.addColorStop(0, "red");
        gradient.addColorStop(0.5, "yellow");
        gradient.addColorStop(1, "violet");
        ctx.setLineDash([10, 3]);


        let audioCtx = new AudioContext();
        let audioSource = audioCtx.createMediaElementSource(this.dom.bgm);
        let gainNode = audioCtx.createGain();
        gainNode.gain.value = 1;
        let analyser = audioCtx.createAnalyser();
        audioSource.connect(analyser);
        analyser.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        document.addEventListener("mousedown", function () {
            if (audioCtx.state != "running") {
                audioCtx.resume();
            }
        })

        //定义小红点坐标的数组
        let redArr = [];
        for (let i = 0; i < 25; i++) {
            redArr[i] = 340;
        }

        // 开始分析
        setInterval(() => {
            ctx.clearRect(0, 0, that.dom.c1.width, that.dom.c1.height);
            let arr = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(arr);
            let result = [];

            for (let i = 0; i < 25; i++) {
                let x = ~~(arr.length / 25 * i);
                result.push(arr[x]);
            }
            //画布高度与实际值产生比例关系，进行二次处理
            let result2 = result.map(function (item, index) {
                return that.dom.c1.height / 255 * item;
            })

            result2.forEach((item, index) => {

                ctx.beginPath();
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 30;
                ctx.moveTo(index * 35 + 15, that.dom.c1.height);
                ctx.lineTo(index * 35 + 15, that.dom.c1.height - item);
                ctx.stroke();
                //画小红点
                if (redArr[index] < that.dom.c1.height - item) {
                    redArr[index] = redArr[index] + 2;
                } else {
                    redArr[index] = that.dom.c1.height - item - 3 - 10;
                }
                if (redArr[index] > that.dom.c1.height - 10) {
                    redArr[index] = that.dom.c1.height - 10;
                }
                ctx.fillStyle = "orange";
                ctx.fillRect(index * 35, redArr[index], 30, 10);

            })

        }, 50)



    }

}

Object.defineProperty(musicControl.data, "currentIndex", {
    get: function () {
        return musicControl.data._currentIndex;
    },
    set: function (v) {
        if (/^-?\d+$/.test(v)) {
            if (v < 0) {
                v = musicControl.data.musicList.length - 1;
            } else if (v > musicControl.data.musicList.length - 1) {
                v = 0;
            }
            musicControl.data._currentIndex = v;

            //索引变音乐变
            let currentMusicItem = musicControl.data.musicList[v];
            musicControl.dom.bgm.src = musicControl.data.BASEURL + currentMusicItem.musicPath;
            musicControl.dom.bgm.play();

            //改变播放列表的样式
            for (let i = 0; i < musicControl.dom.musicListBox.children.length; i++) {
                musicControl.dom.musicListBox.children[i].classList.remove("active");
            }
            musicControl.dom.musicListBox.children[v].classList.add("active");

            //索引变化，歌词也变化
            let lrcText = musicControl.data.musicList[v].lrcText;
            musicControl.data.lrcTxtArr = musicControl.getLrcTextArr(lrcText);
            musicControl.data.lrcTimeArr = musicControl.getLrcTimeArr(lrcText);

            let htmlStr = template("temp2", {
                txtArr: musicControl.data.lrcTxtArr
            })
            musicControl.dom.lrcUl.innerHTML = htmlStr;
            musicControl.dom.txtList = document.querySelectorAll(".lrc-ul>li");
            musicControl.dom.mobileRecord.src = musicControl.data.BASEURL + musicControl.data.musicList[musicControl.data.currentIndex].picPath;

        }
    }
})

musicControl.start();