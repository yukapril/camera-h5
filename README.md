## Camera-H5

`Camera-H5` 是一个手机拍照的库。直接调用系统相机，并提供翻转、压缩等处理功能。

**DEMO**: 参考代码 `/demo` 目录

**2.x版本文档**：参考 [README-2.x.md](./README-2.x.md)

## 安装

```bash
npm install camera-h5 -save
```

或者直接引入文件

```html

<script src="./dist/camera.js"></script>
```

## 快速使用指引

```html

<div class="btn" id="J_Camera">Camera</div>
```

```js
import Camera from 'camera-h5'

// 选择新文件并处理后触发
const onChanged = (err, base64, file) => {
  if (err) {
    console.log(err)
    return
  }
  console.log('Output:', base64)
}
// 选择新文件时触发
const onChange = (e) => {
  console.log('Input Event:', e)
}

const el = document.querySelector('#J_Camera')

el.addEventListener('click', () => {
  new Camera({ type: supportTypes, change: onChange, changed: onChanged })
})
```

## 语法

### new Camera(options)

* 参数:
    * `options` 配置选项对象

| options key | value                                                        |
|-------------|--------------------------------------------------------------|
| `type`      | 拍照的图片格式，默认为 `'image/jpeg'`，多格式可参考 `'image/jpeg,image/png'`   |
| `capture`   | 拍照使用的摄像头，默认为 `camera`（后置摄像头），可以为 `user`（前置摄像头），`none`（自此段留空） |
| `onChange`  | 选择图片后触发的回调。返回未处理的参数（`event`），此回调在图片改变后立刻触发。                  |
| `onChanged` | 选择图片后触发的回调。返回参数为处理后的数据，由于需要处理数据，此回调晚于 `onChange`。            |

### options.onChanged 详解

* 参数为 `(err, base64, file)`

| key            | value                   |
|----------------|-------------------------|
| `name`         | 图片名字                    |
| `type`         | 图片类型                    |
| `size`         | 图片尺寸（单位 B）              |
| `width`        | 图片宽度（仅在部分浏览器及图片格式中存在）   |
| `height`       | 图片高度（仅在部分浏览器及图片格式中存在）   |
| `lastModified` | 图片修改时间（仅在部分浏览器及图片格式中存在） |

## 全局方法

### Camera.getSize(base64)

获取图片尺寸大小。

* 参数:
    * `base64` 图片的 base64 值
    * 返回值: 图片的大小，单位 B

### Camera.getImgInfo(base64, callback)

通过图片的 base64，获取图片的基本信息。

* 参数:
    * `base64` 图片的 base64 值
    * `callback` 参数为 `(err, imgInfo)`
* 返回值: undefined

| imgInfo  | value            |
|----------|------------------|
| `width`  | 图片宽度             |
| `height` | 图片高度             |
| `size`   | 图片尺寸（单位 B）       |
| `base64` | 图片 base64，和传入值相同 |
| `type`   | 图片格式             |
| `img`    | 图片 DOM 实例        |

### Camera.compress(base64, options, callback)

通过图片的 base64，进行压缩图片。最终输出为 `jpg` 格式（可修改）。

> 推荐在任何情况下都压缩一下。

* 参数:
    * `base64` 图片的 base64 值
    * `options` 压缩配置
    * `callback` 参数为 `(err, compressedImgInfo)`
* 返回值: undefined

| options key   | value                                |
|---------------|--------------------------------------|
| `maxLength`   | 压缩图片边长最大值，默认 `1920`                  |
| `maxSize`     | 压缩图片最大尺寸，单位 B，默认 `300*1024`，即 `300K` |
| `type`        | 压缩图片类型，默认 `image/jpeg`               |
| `quality`     | 压缩图片质量，默认 `0.8`                      |
| `offsetRatio` | 容差范围，默认 `0.2`                        |

| compressedImgInfo | value          |
|-------------------|----------------|
| `width`           | 压缩后的图片宽度       |
| `height`          | 压缩后的图片高度       |
| `size`            | 压缩后的图片尺寸（单位 B） |
| `base64`          | 压缩后的图片 base64  |
| `type`            | 图片格式           |

### Camera.rotate(file, callback, config)

根据图片方向旋转图片操作。

> 注意：图片旋转后，图片大小会变大。故先进行图片旋转，在进行压缩操作。

* 参数:
    * `file` 图片文件，可以在 `Camera.prototype.callback` 的 `onChanged` 回调中获取
    * `callback` 参数为 `(err, base64)`
    * `config` 支持：`auto` 自动判断当前浏览器是否自动旋转（默认 `false`）；`type`
      旋转后图片格式（默认 `image/jpeg`）；`quality` 图片质量（默认 `90`）
* 返回值: undefined

```js
Camera.rotate(file, (err, rotatedBase64) => {
  console.log(rotatedBase64)
}, { auto: true })
```

### Camera.isRotated(callback)

判断当前浏览器是否会自动旋转图片。

* 参数:
    * `callback` 参数为 `(rotated)`
* 返回值: undefined

```js
Camera.isRotated((rotated) => {
  if (rotated) {
    console.log('The current device may automatically rotate the image.')
  }
})
```

## v2 升级 v3

主要为初始化及回调方法改变：

```js
const supportTypes = 'image/jpeg,image/png'
const onChange = () => {}
const onChanged = () => {}

// **** for version 2.1 ****
const camera = new Camera('#J_Camera', { type: supportTypes }) // init
camera.callback.onChanged = onChanged // handle input changed
camera.callback.onChange = onChange // handle input change

// **** for version 3.0 ****
const el = document.querySelector('#J_Camera')
el.addEventListener('click', () => {
  // 每次调用，必须重新实例化
  new Camera({ type: supportTypes, change: onChange, changed: onChanged })
})
```

回调区别：

v2 版本为创建输入框覆盖现有按钮，输入框选择图片与上一次一致时，不会触发回调事件。

v3 版本每次均动态创建新的输入框，每次选择图片均会触发回调事件。



