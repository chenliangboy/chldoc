---
outline: deep
---

# ffmpeg

### Audio

1. 生成静音文件
```js
const time = 10;// 时长
const out_path = 'empty.mp3'; //输出路径
const command = `ffmpeg -f lavfi -i anullsrc=r=44100:cl=mono -t ${time} -b:a 256k ${out_path}`;
```

2. 多音频合并
```js
// audio.txt 编写排序文档
file '1.wav'
file '2.wav'
file '3.wav'
```
```js
const out_path = 'out.wav'; //输出路径
const command = `ffmpeg -f concat -safe 0 -i audio.txt -c copy ${out_path}`;
```

### Video

1. 音视频合并
```js
const audio_path = 'audio.mp3';
const video_path = 'video.mp4';
const out_path = 'out.mp4';
const command = `ffmpeg -i ${video_path} -i ${audio_path} -c:v copy -c:a aac -map 0:v:0 -map 1:a:0 ${out_path}`;

```

2. 多视频频合并
```js
// video.txt 编写排序文档
file '1.mp4'
file '2.mp4'
file '3.mp4'
```
```js
const out_path = 'out.mp4'; //输出路径
const command = `ffmpeg -f concat -safe 0 -i video.txt -c copy ${out_path}`;
```

3. 视频循环合并
```js
const video_path = 'video.mp4';
const out_path = 'out.mp4'; //输出路径
const command = `ffmpeg -stream_loop 10 -i ${video_path} -c copy ${out_path}`;
```

