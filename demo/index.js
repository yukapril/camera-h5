var printJSON = function (title, json) {
  var div = document.createElement('div')
  div.innerHTML = title + '<pre>' + JSON.stringify(json, null, 2) + '</pre><br>'
  document.body.appendChild(div)
}
var printImg = function (title, base64) {
  var img = new Image()
  img.src = base64
  img.style.width = '100%'
  document.body.appendChild(img)

  var div = document.createElement('div')
  div.innerHTML = title
  div.appendChild(img)
  div.innerHTML += '<br>'
  document.body.appendChild(div)
}
var printText = function (text) {
  var div = document.createElement('div')
  div.innerHTML = text
  document.body.appendChild(div)
}

var timer = {
  t1: null,
  t2: null
}

var checkAutoRotate = function () {
  Camera.isRotated(function (rotated) {
    if (rotated) {
      printText('The current device may automatically rotate the image.')
    }
  })
}
checkAutoRotate()

// Config
var maxLength = 1920
var maxSize = 200 * 1024

var camera = new Camera('#J_Camera', { type: 'image/jpeg' })

// handle error
camera.error(function (data) {
  console.log('ERR:', data)
})

// handle input changed
camera.on(function (err, base64, file) {
  if (err) {
    console.log('on-err:', err)
    return
  }

  printImg('ORIGIN IMAGE', base64)

  timer.t1 = new Date()

  console.log('Input File:', file)

  printJSON('ORIGIN IMAGE', {
    name: file.name,
    size: file.size,
    width: file.width || 'unkown',
    height: file.height || 'unkown',
    type: file.type
  })

  Camera.rotate(file, function (err, rotatedBase64) {
    printImg('ROTATE IMAGE', rotatedBase64)
    Camera.getImgInfo(rotatedBase64, function (err, imgInfo) {
      console.log('Rotate File:', imgInfo)
      printJSON('ROTATE IMAGE', {
        size: imgInfo.size,
        width: imgInfo.width,
        height: imgInfo.height
      })
    })

    Camera.compress(rotatedBase64, { maxLength: maxLength, maxSize: maxSize }, function (err, data) {
      console.log('Final Image [compressed]:', data)
      printJSON('COMPRESS', {
        name: data.name,
        size: data.size,
        width: data.width,
        height: data.height
      })
      timer.t2 = new Date()
      printJSON('TIME USE', { time: timer.t2 - timer.t1 + 'ms' })
      printImg('RESULT IMAGE', data.base64)
    })
  })
})
