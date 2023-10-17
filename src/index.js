import getSizeStaticApi from './staticApi/getSize'
import getImgInfoStaticApi from './staticApi/getImgInfo'
import compressStaticApi from './staticApi/compress'
import rotateStaticApi from './staticApi/rotate'
import isRotatedStaticApi from './staticApi/isRotated'
import { inputTag } from './element'

function defaultOptions (opts = {}) {
  return {
    type: opts.type || 'image/jpeg',
    capture: opts.capture || 'camera',
    change: opts.change || (() => {}),
    changed: opts.changed || (() => {})
  }
}

class Camera {
  constructor (opts) {
    this.opts = opts
    this.options = defaultOptions(opts)

    const input = inputTag(this.options)
    input.create()
  }
}

getSizeStaticApi(Camera)
getImgInfoStaticApi(Camera)
compressStaticApi(Camera)
rotateStaticApi(Camera)
isRotatedStaticApi(Camera)

export default Camera
