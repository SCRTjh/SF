## HTML5的多媒体技术 

### audio

```html
<audio src="./assets/13.mp3" controls></audio>
<hr>
<audio controls>
    <source src="./assets/13.mp3" >
</audio>
```

**属性**

1. `controls`是否在页面上面显示控制面板，它是一个单属性
2. `autoplay`是否自动播放，它也是一个单属性【当前属性在谷歌浏览器里面第一次使用无效】
3. `currentSrc`这个属性返回当前正在播放音乐的`src`地址
4. `currentTime`当前音乐的进度时间，它以秒为单位
5. `duration`当前音乐的总时间，它以秒为单位
6. `ended`代表当前音乐是否已经播放结束，如果播放结束会触发`onended`事件
7. `loop`它是一个单属性，用于设置当前音乐是否循环播放
8. `muted`它是一个单属性，用于设置当前音乐是否静音
9. `volume`用于设置当前音乐播放的音量，它的值是0-1
10. `playbackRate`用于设置当前音乐播放的倍数，默认值是1
11. `paused`代表当前音乐是否处理暂停状态 ，它是一个单属性，`true`代表音乐暂停了，`false`代表音乐正在播放
12. `networkState`表示当前媒体的网络连接状态：0表示空，1表示正在加载，2表示正在加载元数据，3表示已经加载了第一帧，4表示加载完成
13. `readyState`表示媒体是否已经就绪（可以播放了）。0表示数据不可用，1表示 可以显示当前帧，2表示可以开始播放，3表示媒体可以从头到尾播放，4可用数据足以开始播放
14. `preload`预先加载，`metadata`元数据（音频的基本数据信息），`auto`自动加载 

**事件**

1. `oncanplay`当音频已经在加载并且 可以可以开始播放了就会触发这个事件
2. `onended`当音频播放结束以后就会自动触发这个事件，如果当前的音频添加了`loop`属性则会进行单曲循环，永远不会触发这个`onended`事件
3. `onloadeddata`当音频加载到了第一帧就会触发
4. `onplay`当音乐开播放的时候触发
5. `onplaying`当音乐已经开始播放的时候触发
6. `onratechange`当音频的播放速度被改变的时候就会触发这个事件
7. `onpause`当音乐暂停的时候触发的事件
8. `onvolumechange`当音乐的音量改变的时候触发
9. `onwaiting`当播放网络音频时，网络情况比较差就会出现缓冲，需要等待加载的时候就会触发这个事件
10. `ontimeupdate`当音乐在播放的时候会自动触发（通俗的说就是音乐播放的时间发生变化以后）

**方法**

1. `play()`
2. `pause()`

### video

音频与视频是一样的，只是它的标签不一样而已，它使用`video`标签

```html
<video id="v1" src="./assets/v1.mp4" controls preload="auto"></video>
<!-- 或 -->
<!-- <video id="v1">
<source src="./assets/v1.mp4">
</video> -->
```

视频标签的属性与上面的音频标签的属性保持了一致的原则，扩展了一些新的东西

1. `poster`当前视频的海报图片
2. `dom.requestFullScreen()`请求全屏播放
3. `document.exitFullscreen()`退出全屏播放
4. `dom.requestPictureInPicture()`请求画中画播放
5. `document.exitPictureInPicture()`退出画中画

### canvas画布

