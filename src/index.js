import getRoot from './utils/getRoot'
import options from './instance/options'
import createInputTag from './instance/createInputTag'
import render from './instance/render'
import event from './instance/event'
import onOffApi from './api/onoff'
import errorApi from './api/error'
import getSizeStaticApi from './staticApi/getSize'
import getImgInfoStaticApi from './staticApi/getImgInfo'
import compressStaticApi from './staticApi/compress'

class Camera {
  constructor (element, opts) {
    element = getRoot(element)
    element.style.position = 'relative'
    let data = {
      _self: this,
      el: element,
      opts: opts,
      input: null,
      events: [],
      errorFn: null
    }
    options(data)
    createInputTag(data)
    render(data)
    event(data)
    this.$$data = data
  }
}

errorApi(Camera)
onOffApi(Camera)
getSizeStaticApi(Camera)
getImgInfoStaticApi(Camera)
compressStaticApi(Camera)

export default Camera