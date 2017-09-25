import getImgInfo from '../utils/getImgInfo'

export default Fn => {
  /**
   * 旋转图片
   * @param base64
   * @param direction
   * @param next
   */
  Fn.rotate = (base64, direction, next) => {
    if (direction === 0 || direction === 90 || direction === 180 || direction === 270 || direction === 360) {
      getImgInfo(base64, (img) => {
        let canvas = document.createElement('canvas')
        let ctx = canvas.getContext('2d')

        switch (direction) {
          case 90:
            canvas.width = img.height
            canvas.height = img.width
            ctx.fillStyle = '#fff'
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            ctx.translate(img.height, 0)
            ctx.rotate(direction * Math.PI / 180)
            ctx.drawImage(img.img, 0, 0, canvas.height, canvas.width)
            break
          case 180:
            canvas.width = img.width
            canvas.height = img.height
            ctx.fillStyle = '#fff'
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            ctx.translate(img.width, img.height)
            ctx.rotate(direction * Math.PI / 180)
            ctx.drawImage(img.img, 0, 0, canvas.width, canvas.height)
            break
          case 270:
            canvas.width = img.height
            canvas.height = img.width
            ctx.fillStyle = '#fff'
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            ctx.translate(0, img.width)
            ctx.rotate(direction * Math.PI / 180)
            ctx.drawImage(img.img, 0, 0, canvas.height, canvas.width)
            break
          case 0:
          case 360:
            canvas.width = img.width
            canvas.height = img.height
            ctx.fillStyle = '#fff'
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            ctx.translate(0, 0)
            ctx.rotate(direction * Math.PI / 180)
            ctx.drawImage(img.img, 0, 0, canvas.width, canvas.height)
            break
        }

        let rotatedBase64 = canvas.toDataURL('image/jpeg', 1)
        next && next(rotatedBase64)
        canvas = null
      })
    } else {
      throw Error('[Camera] Camera.rotate direction value is: 0 | 90 | 180 | 270 | 360.')
    }
    return Fn
  }
}
