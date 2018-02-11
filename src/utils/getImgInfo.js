import ImgInfo from '../types/ImgInfo'

/**
 * get image info via base64
 * contains width, height, size, base64, image-object
 * @param base64
 * @param next
 */
export default (base64, next) => {
  let img = new window.Image()
  img.src = base64
  img.onload = () => {
    let imgInfo = new ImgInfo(base64, img)
    next && next(null, imgInfo)
    img = null
  }
  img.onerror = () => {
    img = null
    next && next('get image info error', {})
  }
}
