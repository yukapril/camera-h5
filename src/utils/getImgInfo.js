import ImgInfo from '../types/ImgInfo'

/**
 * get image info via base64
 * contains width, height, size, base64, image-object
 * @param base64
 * @param callback
 */
export default (base64, callback) => {
  let img = new window.Image()
  img.onload = () => {
    callback && callback(null, new ImgInfo(base64, img))
    img = null
  }
  img.onerror = err => {
    img = null
    callback && callback(err, {})
  }
  img.src = base64
}
