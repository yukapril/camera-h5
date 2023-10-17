var printJSON = function (title, json) {
  var div = document.createElement('div')
  div.innerHTML = title + '<pre>' + JSON.stringify(json, null, 2) + '</pre><br>'
  document.body.appendChild(div)
}
var printImg = function (title, base64) {
  var img = new window.Image()
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

var Camera = window.Camera

var checkAutoRotate = function () {
  Camera.isRotated(function (rotated) {
    if (rotated) {
      printText('The current device may automatically rotate the image.')
    }
  })
}

var main = function () {
  // config
  var maxLength = 1920
  var maxSize = 200 * 1024
  var supportTypes = 'image/jpeg,image/png'

  var onChanged = function (err, base64, file) {
    var timer = {
      t1: null,
      t2: null
    }

    if (err) {
      console.log('Err:', err)
      return
    }

    console.log('Input File:', file)
    printImg('ORIGIN IMAGE', base64)
    printJSON('ORIGIN IMAGE', {
      name: file.name,
      size: file.size,
      width: file.width || 'unkown',
      height: file.height || 'unkown',
      type: file.type
    })

    timer.t1 = new Date()

    Camera.rotate(file, function (err, rotatedBase64) {
      printImg('ROTATE IMAGE', rotatedBase64)
      Camera.getImgInfo(rotatedBase64, function (err, imgInfo) {
        console.log('Rotate File:', imgInfo)
        printJSON('ROTATE IMAGE', {
          size: imgInfo.size,
          width: imgInfo.width,
          height: imgInfo.height,
          type: imgInfo.type
        })
      })

      Camera.compress(rotatedBase64, { maxLength: maxLength, maxSize: maxSize }, function (err, data) {
        console.log('Final Image [compressed]:', data)
        printImg('RESULT IMAGE', data.base64)
        printJSON('COMPRESS', {
          name: data.name,
          size: data.size,
          width: data.width,
          height: data.height,
          type: data.type
        })
        timer.t2 = new Date()
        printJSON('TIME USE', { time: timer.t2 - timer.t1 + 'ms' })
      })
    }, { auto: true })
  }

  var onChange = function (e) {
    console.log('Input Event:', e)
  }

  // **** for version 2.1 ****
  // var camera = new Camera('#J_Camera', { type: supportTypes }) // init
  // camera.callback.onChanged = onChanged // handle input changed
  // camera.callback.onChange = onChange // handle input change

  // **** for version 3.0 ****
  var el = document.querySelector('#J_Camera')
  el.addEventListener('click', function () {
    new Camera({ type: supportTypes, change: onChange, changed: onChanged })
  })
}

checkAutoRotate()
main()
