import getImgInfo from '../utils/getImgInfo'
import getBase64Size from '../utils/getBase64Size'

/**
 * 压缩图片方法
 * @param param
 * @param options
 * @param next
 */
let compressImg = (param, options, next) => {
  let quality = options.quality
  let originWidth = param.width
  let originHeight = param.height
  let ratio = param.ratio
  let img = param.img

  let canvas = document.createElement('canvas')
  let ctx = canvas.getContext('2d')
  canvas.width = originWidth * ratio
  canvas.height = originHeight * ratio
  ctx.fillStyle = '#fff'

  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

  let compressedBase64 = canvas.toDataURL('image/jpeg', quality)
  let width = canvas.width
  let height = canvas.height
  canvas = null
  next && next({
    width: width,
    height: height,
    base64: compressedBase64,
    size: getBase64Size(compressedBase64)
  })
}

let loopCompress = (options, param, modifyCompressMaxImgBase64, next) => {
  param.limit--
  if (param.limit < 0) {
    next && next(param.validImgInfo)
  } else {
    compressImg(param, options, imgInfo => {
      if (imgInfo.size <= options.maxSize && (options.maxSize - imgInfo.size) <= options.maxSize * options.offsetRatio) {
        // 图片 size 符合要求
        next && next(imgInfo)
      } else {
        // 图片 size 不符合要求
        if (imgInfo.size <= options.maxSize) {
          // 比要求的 size 小
          // 图片 size 无法变大，此时直接返回
          if (param.ratio > 0.9) {
            next && next(imgInfo)
          } else {
            param.ratioMin = param.ratio
            param.ratio = (param.ratioMax + param.ratio) / 2
            param.validImgInfo = imgInfo
            loopCompress(options, param, false, next)
          }
        } else {
          // 比要求的 size 大
          param.ratioMax = param.ratio
          param.ratio = (param.ratioMin + param.ratio) / 2
          if (modifyCompressMaxImgBase64) {
            param.maxImgBase64 = imgInfo.base64
            param.ratio = 0.5
            param.ratioMin = 0
            param.ratioMax = 1
          }
          loopCompress(options, param, false, next)
        }
      }
    })
  }
}

export default Fn => {
  /**
   * 压缩 base64 图片
   * @returns {*}
   */
  Fn.compress = (base64, opts, callback) => {
    let options = {
      maxLength: opts.maxLength || 1920,
      maxSize: opts.maxSize || 300 * 1024,
      quality: opts.quality || 0.8,
      offsetRatio: opts.offsetRatio || 0.2
    }

    let param = {
      ratio: 1,
      ratioMax: 1,
      ratioMin: 0,
      limit: 5,
      validImgInfo: '',
      maxImgBase64: '',
      width: 0,
      height: 0,
      img: null
    }

    // 尺寸判断
    getImgInfo(base64, imgInfo => {
      param.maxImgBase64 = imgInfo.base64
      param.width = imgInfo.width
      param.height = imgInfo.height
      param.img = imgInfo.img

      if (imgInfo.width <= options.maxLength && imgInfo.height <= options.maxLength) {
        // 尺寸合格
        // 判断当前 size 是否合格
        if (imgInfo.size <= options.maxSize) {
          // 合格直接返回
          callback && callback(imgInfo)
        } else {
          // 不合格查找合适大小
          loopCompress(options, param, false, callback)
        }
      } else {
        // 尺寸不合格
        let max = Math.max(imgInfo.width, imgInfo.height)
        param.ratio = param.ratioMax = options.maxLength / max
        loopCompress(options, param, true, callback)
      }
    })

    return Fn
  }
}
