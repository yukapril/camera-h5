import getImgInfo from '../utils/getImgInfo'
import { CompressedImgInfo } from '../utils/type'

/**
 * compress image
 * @param param
 * @param options
 */
const compressImg = (param, options) => {
  const type = options.type
  const quality = options.quality
  const originWidth = param.width
  const originHeight = param.height
  const ratio = param.ratio
  const img = param.img

  let canvas = document.createElement('canvas')
  let ctx = canvas.getContext('2d')
  canvas.width = originWidth * ratio
  canvas.height = originHeight * ratio
  ctx.fillStyle = '#fff'

  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

  const compressedBase64 = canvas.toDataURL(type, quality)
  const width = canvas.width
  const height = canvas.height
  ctx = null
  canvas = null
  return new CompressedImgInfo(compressedBase64, width, height)
}

const loopCompress = (options, param, modifyCompressMaxImgBase64, next) => {
  param.limit--
  if (param.limit < 0) {
    next && next(param.validImgInfo)
  } else {
    const compressedImgInfo = compressImg(param, options)
    if (compressedImgInfo.size <= options.maxSize && options.maxSize - compressedImgInfo.size <= options.maxSize *
      options.offsetRatio) {
      // 图片 size 符合要求
      next && next(compressedImgInfo)
    } else {
      // 图片 size 不符合要求
      if (compressedImgInfo.size <= options.maxSize) {
        // 比要求的 size 小
        // 图片 size 无法变大，此时直接返回
        if (param.ratio > 0.9) {
          next && next(compressedImgInfo)
        } else {
          param.ratioMin = param.ratio
          param.ratio = (param.ratioMax + param.ratio) / 2
          param.validImgInfo = compressedImgInfo
          loopCompress(options, param, false, next)
        }
      } else {
        // 比要求的 size 大
        param.ratioMax = param.ratio
        param.ratio = (param.ratioMin + param.ratio) / 2
        if (modifyCompressMaxImgBase64) {
          param.maxImgBase64 = compressedImgInfo.base64
          param.ratio = 0.5
          param.ratioMin = 0
          param.ratioMax = 1
        }
        loopCompress(options, param, false, next)
      }
    }
  }
}

export default Fn => {
  /**
   * compress image via base64
   */
  Fn.compress = (base64, opts, callback) => {
    const options = {
      maxLength: opts.maxLength || 1920,
      maxSize: opts.maxSize || 300 * 1024,
      type: opts.type || 'image/jpeg',
      quality: opts.quality || 0.8,
      offsetRatio: opts.offsetRatio || 0.2
    }

    const param = {
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
    getImgInfo(base64, (err, imgInfo) => {
      if (err) {
        callback && callback(err, {})
        return
      }
      param.maxImgBase64 = imgInfo.base64
      param.width = imgInfo.width
      param.height = imgInfo.height
      param.img = imgInfo.img
      const needType = options.type
      const imgType = imgInfo.type

      if (needType !== imgType) {
        // 图片类型不符合，必须重新压缩处理
        loopCompress(options, param, true, imgInfo => {
          callback && callback(null, imgInfo)
        })
      } else {
        // 图片类型符合
        if (imgInfo.width <= options.maxLength && imgInfo.height <= options.maxLength) {
          // 尺寸合格
          // 判断当前 size 是否合格
          if (imgInfo.size <= options.maxSize) {
            // 合格直接返回
            callback && callback(null, imgInfo)
            imgInfo = null
          } else {
            // 不合格查找合适大小
            loopCompress(options, param, false, imgInfo => {
              callback && callback(null, imgInfo)
            })
          }
        } else {
          // 尺寸不合格
          const max = Math.max(imgInfo.width, imgInfo.height)
          imgInfo = null
          param.ratio = param.ratioMax = options.maxLength / max
          loopCompress(options, param, true, imgInfo => {
            callback && callback(null, imgInfo)
          })
        }
      }
    })
  }
}
