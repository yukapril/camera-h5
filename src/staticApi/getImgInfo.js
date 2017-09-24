import getImgInfo from '../utils/getImgInfo'

export default Fn => {
  /**
   * 获取 base64 图片详情
   * @param base64
   * @param next
   */
  Fn.getImgInfo = (base64, next) => {
    getImgInfo(base64, next)
    return Fn
  }
}
