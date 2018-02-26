## Camera-H5

`Camera-H5` 是一个手机拍照的库。直接调用系统相机，并提供翻转、压缩等处理功能。
 
**DEMO**: 参考 `/demo` 目录

**[English Here](README.md)**

## 安装

```bash
npm install camera-h5 -save
```

OR 

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

// 出错时触发
camera.error(function (data) {
  console.log('ERR:', data)
})

// 选择新文件时触发
camera.on(function (err, base64, file) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Input File:', file)
})
```

## 语法

### new Camera(element, options)

* 参数:
  * `element` 页面调用相机的元素，可以为 `string`，也可以为 HTMLElement对象
  * `options` 配置选项对象
* 返回值: 当前 `camera` 的实例

| options key | value                                    |
| ----------- | ---------------------------------------- |
| `type`      | 拍照的图片格式，默认为 `['image/jpeg']`，多格式可参考 `['image/jpeg', 'image/png']` |

### Camera.prototype.error(callback)

当 Camera 遇到错误时，执行的回调函数。

* 参数:
  * `callback` 参数为 `{type: 'error type', err: 'xxx xxx'}`
* 返回值: 当前 `camera` 的实例

### Camera.prototype.on(callback)

当拍照内容改变时，触发的回调。

* 参数:
  * `callback` 参数为 `(err, base64, file)`
* 返回值: 当前 `camera` 的实例

| file           | value            |
| -------------- | ---------------- |
| `name`         | 图片名字             |
| `type`         | 图片类型             |
| `size`         | 图片尺寸（单位 B）       |
| `width`        | 图片宽度（仅在部分浏览器中存在） |
| `height`       | 图片高度（仅在部分浏览器中存在） |
| `lastModified` | 图片修改时间           |

### Camera.prototype.off(callback)

解除回调函数。

* 参数:
  * `callback` 如果不传参数，则表示解除所有回调函数
* 返回值: 当前 `camera` 的实例

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
* 返回值: Camera 构造函数

| imgInfo  | value            |
| -------- | ---------------- |
| `width`  | 图片宽度             |
| `height` | 图片高度             |
| `size`   | 图片尺寸（单位 B）       |
| `base64` | 图片 base64，和传入值相同 |
| `img`    | 图片 DOM 实例        |

### Camera.compress(base64, options, callback)

通过图片的 base64，进行压缩图片。最终输出为 `jpg` 格式。

> 推荐在任何情况下都压缩一下。

* 参数:
  * `base64` 图片的 base64 值
  * `options` 压缩配置
  * `callback` 参数为 `(err, compressedImgInfo)`
* 返回值: Camera 构造函数

| options key   | value                                   |
| ------------- | --------------------------------------- |
| `maxLength`   | 压缩图片边长最大值，默认 `1920`                       |
| `maxSize`     | 压缩图片最大尺寸，单位 B，默认 `300*1024`，即 `300K`      |
| `quality`     | 压缩图片质量，默认 `0.8`                         |
| `offsetRatio` | 容差范围，默认 `0.2` |

| compressedImgInfo | value          |
| ----------------- | -------------- |
| `width`           | 压缩后的图片宽度       |
| `height`          | 压缩后的图片高度       |
| `size`            | 压缩后的图片尺寸（单位 B） |
| `base64`          | 压缩后的图片 base64  |

### Camera.rotate(file, callback)

旋转图片操作。

> 注意：图片旋转后，图片大小会变大。故先进行图片旋转，在进行压缩操作。

* 参数:
  * `file` 图片文件，可以在 `Camera.prototype.on(callback)` 中获取
  * `callback` 参数为 `(err, base64)`
* 返回值: Camera 构造函数
