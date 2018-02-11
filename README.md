## 介绍

`Camera-H5` 是在手机浏览器上，直接调用系统相机进行拍照，并提供压缩处理的库。

**DEMO**: 参考 `/demo` 目录

## 安装

```bash
npm install camera-h5 -save
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

* 参数
  * `element` 页面调用相机的元素，可以为 `string`，也可以为 HTMLElement对象
  * `options` 配置选项对象
* 返回值 

  当前 Camera 的实例
  
| option keys | value                                    |
| ----------- | ---------------------------------------- |
| `type`      | 拍照的图片格式，默认为 `image/jpeg`，如需支持自定义格式，使用逗号 `,` 分隔 |

### Camera.prototype.error(callback)

当 Camera 遇到错误时，执行的回调函数。

* 参数
  * `callback` 包含一个参数，为错误对象，形式为 `{type: 'error type', err: 'xxx xxx'}`
* 返回值

  当前 Camera 的实例

### Camera.prototype.on(callback)

当拍照内容改变时，触发的回调。

* 参数
  * `callback` 回调函数，参数为 `(err, base64, file)`。`err` 和 `Camera.prototype.error(callback)` 回调内容一致，但不含 `type` 字段。
* 返回值

  当前 Camera 的实例

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

* 参数
  * `callback` 如果不传参数，则表示解除所有回调函数
* 返回值

  当前 Camera 的实例

## 方法

### Camera.getSize(base64)

获取图片尺寸大小。

* 参数
  * `base64` 图片的 base64 值
* 返回值

  图片的大小，单位 B

### Camera.getImgInfo(base64, callback)

通过图片的 base64，获取图片的基本信息。

* 参数
  * `base64` 图片的 base64 值
  * `callback` 回调函数，参数为 `(err, imgInfo)`
* 返回值

  Camera 构造函数

| imgInfo  | value            |
| -------- | ---------------- |
| `width`  | 图片宽度             |
| `height` | 图片高度             |
| `size`   | 图片尺寸（单位 B）       |
| `base64` | 图片 base64，和传入值相同 |
| `img`    | 图片 DOM 实例        |

### Camera.compress(base64, options, callback)

通过图片的 base64，进行压缩图片。最终输出为 `jpg` 格式。

> 说明
>
> 任何情况均可以进行压缩。
>
> 不论当前图片是否满足要求，建议都进行一次压缩，以获得更好的图片尺寸。

控制逻辑：

1. 原图已经符合要求：会将该图片完整尺寸再进行一次压缩，并把最优结果返回（原图或压缩一次的图）
2. 原图不符合要求：
  * 会将该图片完成尺寸进行一次压缩，如果符合要求，则返回
  * 不符合上一条要求情况下，则进行二分法计算，找到最佳结果返回（使用二分法尝试查找，最多进行 8 次）

最佳图片效果定义：

1. 小于等于配置的图片边长；
2. 小于等于配置的最大尺寸；
3. 与配置的最大尺寸差值不超过 5%
4. 同时满足以上三条

* 参数
  * `base64` 图片的 base64 值
  * `options` 配置对象
  * `callback` 回调函数，参数为 `(err, compressedImgInfo)`
* 返回值

  Camera 构造函数

| option keys   | value                                   |
| ------------- | --------------------------------------- |
| `maxLength`   | 图片边长最大值，默认 `1920`                       |
| `maxSize`     | 图片最大尺寸，单位 B，默认 `300*1024`，即 `300K`      |
| `quality`     | 压缩图片质量，默认 `0.8`                         |
| `offsetRatio` | 容差范围，默认 `0.2`，数值越大，最终图片与 `maxSize` 差距越大 |

| compressedImgInfo | value          |
| ----------------- | -------------- |
| `width`           | 压缩后的图片宽度       |
| `height`          | 压缩后的图片高度       |
| `size`            | 压缩后的图片尺寸（单位 B） |
| `base64`          | 压缩后的图片 base64  |



### Camera.rotate(file, callback)

对 base64 图片进行旋转操作。**注意：图片旋转后，图片大小会变大。故先进行图片旋转，在进行压缩操作。**

* 参数
  * `file` 图片文件，可以在 `Camera.prototype.on(callback)` 中获取。
  * `callback` 处理结果回调函数，参数对象为处理后的图片 base64。
* 返回值

  Camera 构造函数
