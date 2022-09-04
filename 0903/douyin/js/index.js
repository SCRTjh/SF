var videoControl = {
    dom: {
        videoArr: [],
        swiperWrapper: document.querySelector(".swiper-wrapper")
    },
    data: {
        mySwiper: null,
    },
    bindEvent: function () {
        var that = this;
        // 事件委托
        this.dom.swiperWrapper.addEventListener("click", function (event) {

            if (event.target.matches(".video-item")) {
                console.log(event.target);
                if (event.target.paused) {
                    event.target.play();
                } else {
                    event.target.pause();
                }
            }
        });
        // 监听键盘按键
        document.addEventListener("keydown", function (event) {
            if (!event.repeat) {
                switch (event.keyCode) {
                    case 38: that.data.mySwiper.slidePrev(); break;
                    case 40: that.data.mySwiper.slideNext(); break;
                }
            }
        })

    },
    start: function () {
        var that = this;
        this.renderTemplate(".swiper-wrapper", "temp1", {
            videoList: videoList
        })

        // 初始化轮播图
        this.data.mySwiper = new Swiper("#box", {
            direction: "vertical",
            loop: true,
            on: {
                // 当滑块切换的时候
                slideChange: function () {
                    console.log(this.activeIndex);
                    that.videoChange(this.activeIndex);
                }
            },
            lazy: {
                loadPrevNext: true,
            }
        });
        this.bindEvent();
    },
    //渲染模板
    renderTemplate: function (selector, tempId, data) {
        let dom = document.querySelector(selector);
        let htmlStr = template(tempId, data);
        dom.innerHTML = htmlStr;
        this.dom.videoArr = document.querySelectorAll(".video-item");
    },
    //视频变化时
    videoChange: function (activeIndex) {
        //index代表的就是当前的视频索引
        var that = this;
        this.dom.videoArr.forEach(function (item, index) {
            if (index === activeIndex - 1) {
                // 当前视频开始播放
                that.dom.videoArr[index].play();
                console.log(that.dom.videoArr[index].paused);

            } else {
                //其他视频暂停
                that.dom.videoArr[index].pause();
                that.dom.videoArr[index].removeAttribute("src");
            }
        })
    }
}


videoControl.start();