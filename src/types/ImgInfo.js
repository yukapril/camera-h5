import getBase64Size from '../utils/getBase64Size'

export default class ImgInfo {
  constructor (base64, img) {
    this.width = img.width || null
    this.height = img.height || null
    this.size = getBase64Size(base64) || null
    this.base64 = base64 || null
    this.img = img || null
  }
}
