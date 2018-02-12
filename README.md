## Camera-H5

`Camera-H5` is a camera library, use camera to take photos, and provides rotation and compression.

**DEMO**: Reference `/demo` folder.

**[中文文档参见这里](README.ZH-CN.md)**

## Install

```bash
npm install camera-h5 -save
```

OR 

```html
<script src="./dist/camera.js"></script>
```

## Quickstart

```html
<div class="btn" id="J_Camera">Camera</div>
```

```js
import Camera from 'camera-h5'

var camera = new Camera('#J_Camera')

// error handler
camera.error(function (data) {
  console.log('ERR:', data)
})

// input changed handler
camera.on(function (err, base64, file) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Input File:', file)
})
```

## Methods

### new Camera(element, options)

* Arguments:
  * `element` the element which to bind, can be a `string`，or `HTMLElement` object.
  * `options` init options object
* Returns: `camera` - the instance itself

| options key | value                                    |
| ----------- | ---------------------------------------- |
| `type`      | Photo format. Default `['image/jpeg']`. More like `['image/jpeg', 'image/png']` |

### Camera.prototype.error(callback)

Callback handler when errors.

* Arguments:
  * `callback` Arguments `{type: 'error type', err: 'xxx xxx'}`
* Returns: `camera` - the instance itself

### Camera.prototype.on(callback)

Callback handler when image input-dialog changed.

* Arguments:
  * `callback` Arguments `(err, base64, file)`
* Returns: `camera` - the instance itself

| file           | value                                |
| -------------- | ------------------------------------ |
| `name`         | image name                           |
| `type`         | image type                           |
| `size`         | image size (unit: byte)              |
| `width`        | image width (only in some browsers)  |
| `height`       | image height (only in some browsers) |
| `lastModified` | image last modified time             |

### Camera.prototype.off(callback)

remove callback handler.

* Arguments:
  * `callback` If the arguments is empty, all handler will be removed.
* Returns: `camera` - the instance itself

## Global Methods

### Camera.getSize(base64)

Get image size.

* Arguments:
  * `base64` Image base64
* Returns: Image size (unit: byte)

### Camera.getImgInfo(base64, callback)

Get image base info via base64.

* Arguments:
  * `base64` Image base64
  * `callback` Arguments `(err, imgInfo)`
* Returns: `Camera` - the global function

| imgInfo  | value                                    |
| -------- | ---------------------------------------- |
| `width`  | image width                              |
| `height` | image height                             |
| `size`   | image size (unit: byte)                  |
| `base64` | image base64 (same to arguments `base64`) |
| `img`    | image DOM (`HTMLElement`)                |

### Camera.compress(base64, options, callback)

Compress image via base64, and output `jpg` format image.

> A compresstion is recommended for better image size by any time.

* Arguments:
  * `base64` Image that will be compressed
  * `options` Compress options
  * `callback` Arguments `(err, compressedImgInfo)`
* Returns: `Camera` - the global function

| options key   | value                                    |
| ------------- | ---------------------------------------- |
| `maxLength`   | compress image width/height max, default `1920` |
| `maxSize`     | compress image max size (unit: byte), default `300*1024`,  `300K` |
| `quality`     | compress image quality, default `0.8`    |
| `offsetRatio` | size range ratio, default `0.2`          |

| compressedImgInfo | value                              |
| ----------------- | ---------------------------------- |
| `width`           | compressed image width             |
| `height`          | compressed image height            |
| `size`            | compressed image size (unit: byte) |
| `base64`          | compressed image base64            |

### Camera.rotate(file, callback)

Rotate the image.

> Note: After the image is rotated, the image size will become larger. Therefore, the image is rotated and then compressed.

* Arguments:
  * `file` Image file. Get it in `Camera.prototype.on(callback)` 
  * `callback` Arguments (`base64`) 
* Returns: `Camera` - the global function

