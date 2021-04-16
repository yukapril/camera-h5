import getImgInfo from '../utils/getImgInfo'

export default Fn => {
  /**
   * get image info via base64
   * @param base64
   * @param callback
   */
  Fn.getImgInfo = (base64, callback) => getImgInfo(base64, callback)
}
