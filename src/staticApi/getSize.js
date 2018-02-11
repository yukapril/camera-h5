import getBase64Size from '../utils/getBase64Size'

export default Fn => {
  /**
   * get size via base64
   * @param base64
   */
  Fn.getSize = base64 => getBase64Size(base64)
}
