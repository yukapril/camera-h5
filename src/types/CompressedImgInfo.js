import getBase64Size from '../utils/getBase64Size'

export default class CompressedImgInfo {
  constructor (base64, width, height) {
    this.width = width || null
    this.height = height || null
    this.size = getBase64Size(base64) || null
    this.base64 = base64 || null
  }
}
