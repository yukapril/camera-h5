import fileReader from '../utils/fileReader'

/**
 * check image file type
 * @param legalType
 * @param type
 */
const checkType = (legalType, type) => {
  const legalTypes = legalType.split(',')
  return legalTypes.indexOf(type) >= 0
}

/**
 * bind camera element event
 * @param data
 */
export default data => {
  data.input.addEventListener('change', e => {
    let files = e.target.files
    if (files.length > 0) {
      let file = files[0]
      let fileType = file.type
      if (!checkType(data.opts.type, fileType)) {
        let err = 'Illegal type: ' + fileType
        data.events.forEach(fn => fn({type: 'type', err}, '', null))
        data.errorFn && data.errorFn.call(data._self, {type: 'type', err})
        return
      }
      fileReader(file, (err, base64) => {
        if (err) {
          data.events.forEach(fn => fn(err, '', null))
          data.errorFn && data.errorFn.call(data._self, {type: 'error file', err: 'Illegal file:' + file})
          return
        }
        data.events.forEach(fn => fn(null, base64, file))
      })
    }
  })
}
