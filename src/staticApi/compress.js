import getImgInfo from '../utils/getImgInfo'
import getBase64Size from '../utils/getBase64Size'

/**
 * 压缩图片方法
 * @param base64
 * @param quality
 * @param ratio
 * @param next
 */
let compressImg = (base64, quality, ratio, next) => {
  getImgInfo(base64, img => {
    let canvas = document.createElement('canvas')
    let ctx = canvas.getContext('2d')
    canvas.width = img.width * ratio
    canvas.height = img.height * ratio
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img.img, 0, 0, canvas.width, canvas.height)
    let compressedBase64 = canvas.toDataURL('image/jpeg', quality)
    next && next({
      width: canvas.width,
      height: canvas.height,
      base64: compressedBase64,
      size: getBase64Size(compressedBase64)
    })
    canvas = null
  })
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
      quality: opts.quality || .9,
      offsetRatio: opts.offsetRatio || 0.05
    }

    let pack1 = {
      size: null,
      width: null,
      height: null,
      base64: null
    }
    let pack2 = {
      ratioMax: 1,
      ratioMin: 0,
      ratio: null
    }

    /**
     * 每轮压缩图片，并写入数据包 pack1 / pack2
     * @param ratio
     * @param next
     */
    let packRun = (ratio, next) => {
      compressImg(base64, options.quality, ratio, data => {
        pack2.ratio = ratio
        pack1.size = data.size
        pack1.width = data.width
        pack1.height = data.height
        pack1.base64 = data.base64
        if (pack1.width <= options.maxLength && pack1.height <= options.maxLength && pack1.size <= options.maxSize) {
          pack2.ratioMin = ratio
        } else {
          pack2.ratioMax = ratio
        }
        // 如果当前结果
        // 小于规定大小，并且在允许波动尺寸范围内
        // 就算做计算完成
        let isComplete = (options.maxSize - pack1.size) > 0 && (options.maxSize - pack1.size) < options.maxSize * options.offsetRatio
        next && next(isComplete)
      })
    }

    let index = 0
    let count = 8

    /**
     * 二分法查找合适 ratio
     */
    let run = () => {
      let ratio = (pack2.ratioMax + pack2.ratioMin) / 2
      packRun(ratio, isComplete => {
        if (!isComplete) {
          // 未完成情况
          if (index < count) {
            // 未完成，在规定次数内，继续查找
            index++
            run()
          } else {
            // 未完成，超过规定次数，直接返回最后一次结果
            callback && callback(pack1)
          }
        } else {
          // 已完成情况
          callback && callback(pack1)
        }
      })
    }

    /**
     * 验证传入数据有效性
     * 并根据结果分配如何进行压缩
     */
    let check = () => {
      getImgInfo(base64, data => {
        if (data.width <= options.maxLength && data.height <= options.maxLength && data.size <= options.maxSize) {
          // 传入 base64 大小符合要求，此时按照原尺寸进行压缩
          // 如果更小，则返回新值，否则返回原值
          compressImg(base64, options.quality, 1, imgData => {
            if (imgData.size < data.size) {
              callback && callback(imgData)
            } else {
              delete data.img
              callback && callback(data)
            }
          })
        } else {
          // 传入 base64 大小不符合要求
          // 首先测试 ratio=1，如果合格则返回
          // 不合格则二分法计算
          compressImg(base64, options.quality, 1, imgData => {
            if (imgData.size < options.maxSize) {
              callback && callback(imgData)
            } else {
              run()
            }
          })
        }
      })
    }

    check()
  }
  return Fn
}
