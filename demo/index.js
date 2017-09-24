import Camera from 'camera-h5'

var maxLength = 1920
var maxSize = 200 * 1024
var camera = new Camera('#J_Camera', {type: 'image/jpeg'})

camera.error(function (data) {
  console.log('ERR:', data)
})

camera.on(function (file) {
  console.log('Input File:', file)
  var div1 = document.createElement('div')
  div1.innerHTML = '<br/>拍照原图：<pre>' + JSON.stringify({
      name: file.name,
      size: file.size,
      width: file.width,
      height: file.height,
      type: file.type
    }, null, 2) + '</pre>'
  document.body.appendChild(div1)

  Camera.compress(file.base64, {maxLength: maxLength, maxSize: maxSize}, function (data) {
    console.log('Final Image [compressed]:', data)
    var div2 = document.createElement('div')
    div2.innerHTML = '<br/>处理后：<pre>' + JSON.stringify({
        name: data.name,
        size: data.size,
        width: data.width,
        height: data.height
      }, null, 2) + '</pre>'
    document.body.appendChild(div2)

    // 插入页面进行展示
    var img = new Image()
    img.src = data.base64
    document.body.appendChild(img)
    img = null
  })
})