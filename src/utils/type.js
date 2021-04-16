import getBase64Size from './getBase64Size'

export class CompressedImgInfo {
  constructor (base64, width, height) {
    this.width = width || null
    this.height = height || null
    this.size = getBase64Size(base64) || null
    this.base64 = base64 || null
  }
}

export class ImgInfo {
  constructor (base64, img) {
    this.width = img.width || null
    this.height = img.height || null
    this.size = getBase64Size(base64) || null
    this.base64 = base64 || null
    this.img = img || null
  }
}
