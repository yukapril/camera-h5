import fileToBase64 from '../utils/fileToBase64'

/**
 * 验证图片格式有效性
 * @param legalType
 * @param type
 */
const checkType = (legalType, type) => {
  const legalTypes = legalType.split(',')
  return legalTypes.indexOf(type) >= 0
}

/**
 * 绑定拍照组件触发事件
 * @param data
 */
export default data => {
  data.input.addEventListener('change', e => {
    let files = e.target.files
    if (files.length > 0) {
      let file = files[0]
      let fileType = file.type
      if (!checkType(data.opts.type, fileType)) {
        data.errorFn.call(data._self, {type: 'type', err: 'Illegal type: ' + fileType})
        return
      }
      fileToBase64(file, base64 => {
        data.events.forEach(fn => fn(base64, file))
      })
    }
  })
}
