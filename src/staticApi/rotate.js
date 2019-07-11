import getImgInfo from '../utils/getImgInfo'
import fileReader from '../utils/fileReader'

/**
 * get image exif orientation
 * from: https://github.com/exif-js/exif-js/issues/63 @ercinakcay
 * @param file
 * @param next
 * @returns (int) -3:file read error, -2:not jpeg, -1:not find exif
 */
const getOrientation = (file, next) => {
  const reader = new window.FileReader()
  reader.onload = e => {
    const view = new window.DataView(e.target.result)
    if (view.getUint16(0, false) !== 0xffd8) {
      // file is not jpeg!
      next(-2)
      return
    }
    const length = view.byteLength
    let offset = 2
    let result
    while (offset < length) {
      const marker = view.getUint16(offset, false)
      offset += 2
      if (marker === 0xffe1) {
        if (view.getUint32((offset += 2), false) !== 0x45786966) {
          result = -1
        }
        const little = view.getUint16((offset += 6), false) === 0x4949
        offset += view.getUint32(offset + 4, little)
        const tags = view.getUint16(offset, little)
        offset += 2
        for (let i = 0; i < tags; i++) {
          if (view.getUint16(offset + i * 12, little) === 0x0112) {
            result = view.getUint16(offset + i * 12 + 8, little)
          }
        }
      } else if ((marker & 0xff00) !== 0xff00) {
        break
      } else {
        offset += view.getUint16(offset, false)
      }
    }
    next(result || -1)
  }
  reader.onerror = () => {
    next(-3)
  }

  reader.readAsArrayBuffer(file)
}

/**
 * Orientation to Direction
 * @param orientation
 */
const getDirection = orientation => {
  let rotate = null
  switch (orientation) {
    case 1:
      rotate = 0
      break
    case 6:
      rotate = 90
      break
    case 3:
      rotate = 180
      break
    case 8:
      rotate = 270
      break
    default:
      rotate = 0
  }
  return rotate
}

export default Fn => {
  /**
   * roate image
   * @param base64
   * @param direction
   * @param callback
   */
  Fn.rotate = (file, callback) => {
    fileReader(file, (err, base64) => {
      if (err) {
        callback && callback(err, '')
        return
      }
      getImgInfo(base64, (err, imgInfo) => {
        if (err) {
          callback && callback(err, '')
          return
        }
        getOrientation(file, orientation => {
          // support orientation (1|3|6|8)
          if (orientation === 1 || orientation === 3 || orientation === 6 || orientation === 8) {
            let canvas = document.createElement('canvas')
            let ctx = canvas.getContext('2d')
            const direction = getDirection(orientation)
            switch (direction) {
              case 90:
                canvas.width = imgInfo.height
                canvas.height = imgInfo.width
                ctx.fillStyle = '#fff'
                ctx.fillRect(0, 0, canvas.width, canvas.height)
                ctx.translate(imgInfo.height, 0)
                ctx.rotate(direction * Math.PI / 180)
                ctx.drawImage(imgInfo.img, 0, 0, canvas.height, canvas.width)
                break
              case 180:
                canvas.width = imgInfo.width
                canvas.height = imgInfo.height
                ctx.fillStyle = '#fff'
                ctx.fillRect(0, 0, canvas.width, canvas.height)
                ctx.translate(imgInfo.width, imgInfo.height)
                ctx.rotate(direction * Math.PI / 180)
                ctx.drawImage(imgInfo.img, 0, 0, canvas.width, canvas.height)
                break
              case 270:
                canvas.width = imgInfo.height
                canvas.height = imgInfo.width
                ctx.fillStyle = '#fff'
                ctx.fillRect(0, 0, canvas.width, canvas.height)
                ctx.translate(0, imgInfo.width)
                ctx.rotate(direction * Math.PI / 180)
                ctx.drawImage(imgInfo.img, 0, 0, canvas.height, canvas.width)
                break
              case 0:
                canvas.width = imgInfo.width
                canvas.height = imgInfo.height
                ctx.fillStyle = '#fff'
                ctx.fillRect(0, 0, canvas.width, canvas.height)
                ctx.translate(0, 0)
                ctx.rotate(direction * Math.PI / 180)
                ctx.drawImage(imgInfo.img, 0, 0, canvas.width, canvas.height)
                break
            }
            const rotatedBase64 = canvas.toDataURL('image/jpeg', 0.9)
            ctx = null
            canvas = null
            callback && callback(null, rotatedBase64)
          } else {
            // unrecognized orientation
            callback && callback(null, base64)
          }
        })
      })
    })

    return Fn
  }
}
