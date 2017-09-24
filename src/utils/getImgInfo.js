import getBase64Size from './getBase64Size'

/**
 * 通过 base64 获取图片信息
 * @param base64
 * @param next
 */
export default (base64, next) => {
  let img = new Image()
  img.src = base64
  img.onload = () => {
    next && next({
      width: img.width,
      height: img.height,
      size: getBase64Size(base64),
      base64,
      img
    })
    img = null
  }
}
