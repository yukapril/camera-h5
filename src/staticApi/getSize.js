import getBase64Size from '../utils/getBase64Size'

export default Fn => {
  /**
   * 获取 base64 图片大小
   * @param base64
   */
  Fn.getSize = base64 => {
    return getBase64Size(base64)
  }
}
