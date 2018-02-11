import getImgInfo from '../utils/getImgInfo'

export default Fn => {
  /**
   * get image info via base64
   * @param base64
   * @param next
   */
  Fn.getImgInfo = (base64, next) => {
    getImgInfo(base64, next)
    return Fn
  }
}
