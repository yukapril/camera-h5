## Camera-H5

`Camera-H5` 是一个手机拍照的库。直接调用系统相机，并提供翻转、压缩等处理功能。

**DEMO**: 参考代码 `/demo` 目录

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

var camera = new Camera('#J_Camera')

// 选择新文件并处理后触发
camera.callback.onChanged = function (err, base64, file) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Output:', base64)
}
// 选择新文件时触发
camera.callback.onChange = function (e) {
  console.log('Input Event:', e)
}
```

## 语法

### new Camera(element, options)

* 参数:
    * `element` 页面调用相机的元素，可以为 `string`，也可以为 `HTMLElement` 对象
    * `options` 配置选项对象
* 返回值: undefined

| options key | value                                                         |
|-------------|---------------------------------------------------------------|
| `type`      | 拍照的图片格式，默认为 `'image/jpeg'`，多格式可参考 `'image/jpeg,image/png'`    |
| `capture`   | 拍照使用的摄像头，默认为 `camera`（后置摄像头），可以为 `user`（前置摄像头），`none`（系统自动处理） |

### camera.callback.onChange

当拍照内容改变时，触发的回调。返回未处理的参数（`event`），此回调在图片改变后立刻触发。

### camera.callback.onChanged

当拍照内容改变时，触发的回调。返回参数为处理后的数据，由于需要处理数据，此回调晚于 `onChange`。

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
Camera.rotate(file, function (err, rotatedBase64) {
  console.log(rotatedBase64)
}, { auto: true })
```

### Camera.isRotated(callback)

判断当前浏览器是否会自动旋转图片。

* 参数:
    * `callback` 参数为 `(rotated)`
* 返回值: undefined

```js
Camera.isRotated(function (rotated) {
  if (rotated) {
    console.log('The current device may automatically rotate the image.')
  }
})
```

## v1 升级 v2

**事件监听变化**

```js
// v1 版监听事件为
camera.on(onChanged, onChange)
// v2 版需要调整为两个方法
camera.callback.onChange
camera.callback.onChanged
```

**取消错误事件**

```js
// v1 版错误监听
camera.error
// v2 版不存在此方法
```

**不再支持链式操作**

原 v1 版数据操作后，返回原实例化，v2 版均返回 `undefined`。

**增加 `type` 类型**

```js
// 以下方法，新增了 type 类型返回
camera.callback.onChanged
Camera.getImgInfo
Camera.compress
```



