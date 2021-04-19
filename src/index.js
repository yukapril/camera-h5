import { getRoot, createInputTag, renderInput, bindEvent } from './element'
import getSizeStaticApi from './staticApi/getSize'
import getImgInfoStaticApi from './staticApi/getImgInfo'
import compressStaticApi from './staticApi/compress'
import rotateStaticApi from './staticApi/rotate'
import isRotatedStaticApi from './staticApi/isRotated'

function defaultOptions (opts = {}) {
  return {
    type: opts.type || 'image/jpeg',
    capture: opts.capture || 'camera'
  }
}

class Camera {
  constructor (element, opts) {
    const root = getRoot(element)
    root.style.position = 'relative'

    const data = {
      _self: this,
      root,
      opts,
      options: {},
      input: null
    }

    this.$$data = data
    this.callback = { onChanged: () => {}, onChange: () => {} }

    data.options = defaultOptions(data.opts)
    data.input = createInputTag(data.options)
    renderInput(data.root, data.input)
    bindEvent(data.input, data.options, this.callback)
  }
}

getSizeStaticApi(Camera)
getImgInfoStaticApi(Camera)
compressStaticApi(Camera)
rotateStaticApi(Camera)
isRotatedStaticApi(Camera)

export default Camera
