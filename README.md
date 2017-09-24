## 介绍

`Camera-H5` 是在手机浏览器上，直接调用系统相机进行拍照，并提供压缩处理的库。

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

var camera = new Camera('#J_Camera', {type: 'image/jpeg'})

// 出错时触发
camera.error(function (data) {
  console.log('ERR:', data)
})

// 选择新文件时触发
camera.on(function (file) {
    console.log('Input File:', file)
})
```

## 语法

> ```js
> var Camera = new Camera(element,options)
> ```

#### 参数

`element` 页面调用相机的元素，可以为 `string`，也可以为 HTMLElement对象。

`options` 配置选项对象：

* `type` 拍照的图片格式，默认为 `image/jpeg,image/png`，如需支持自定义格式，使用逗号 `,` 分隔。

#### 返回值

当前 Camera 的实例


## 方法

### Camera.prototype.error(callback)

当 Camera 遇到错误时，执行的回调函数。

#### 参数

`callback` 包含一个参数，为错误对象，形式为 `{type: 'abc', err: 'def'}`

目前仅支持回调图片格式错误的情况，即 `{type: 'type', err: 'Illegal type: Application/json'}`

#### 返回值 

当前 Camera 的实例

### Camera.prototype.on(callback)

当拍照内容改变时，触发的回调。

#### 参数

`callback` 回调参数为一个拍照后的图片结果对象。格式如：

```js
{
  base64: "data:image/jpeg;base64,/9j/...",
  height: 3024, 
  lastModified:1504095728000,
  lastModifiedDate: Wed Aug 30 2017 20:22:08 GMT+0800 (CST) {},
  name: "Image.JPG",
  size: 1513616,
  type: "image/jpeg",
  width: 4032
```

字段说明：

- `name` 图片名字
- `type` 图片类型
- `size` 图片尺寸（单位 B）
- `width` 图片宽度
- `height` 图片高度
- `base64` 图片 base64，可以直接放置在 img 的 src 中使用
- `lastModified` / `lastModifiedDate` 图片修改时间

#### 返回值

当前 Camera 的实例

### Camera.prototype.off(callback)

解除回调函数。

#### 参数

`callback` 如果不传参数，则表示解除所有回调函数

#### 返回值

当前 Camera 的实例

## 属性

### Camera.getSize(base64)

获取图片尺寸大小。

#### 参数

`base64` 图片的 base64 值（可以包含文件头）

#### 返回值

图片的大小，单位 B

### Camera.getImgInfo(base64, callback)

通过图片的 base64，获取图片的基本信息。

#### 参数

`base64` 图片的 base64 值（可以包含文件头）

`callback` 处理结果回调函数，参数对象为图片信息：

* `width` 图片宽度
* `height` 图片高度
* `size` 图片尺寸（单位 B ）
* `base64` 图片 base64，和传入值相同
* `img` 图片 DOM 实例

#### 返回值

Camera 构造函数

### Camera.compress(base64, options, callback)

通过图片的 base64，进行压缩图片。最终输出为 `jpg` 格式。

#### 说明

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

#### 参数

`base64` 图片的 base64 值（可以包含文件头）

`options` 配置对象，可配置属性为：

* `maxLength` 图片边长最大值，默认 `1920`。
* `maxSize` 图片最大尺寸，单位 B，默认 `300*1024`，即 `300K`。
* `quality` 压缩图片质量，默认 `0.9`。

`callback` 回调函数，参数为图片信息：

* `width` 压缩后的图片宽度
* `height` 压缩后的图片高度
* `size` 压缩后的图片尺寸（单位 B）
* `base64` 压缩后的图片 base64 

#### 返回值

Camera 构造函数



