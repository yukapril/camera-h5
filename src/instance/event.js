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
    // onChange callback
    data.events.forEach(event => event.onChange(e))

    let files = e.target.files
    if (files.length > 0) {
      let file = files[0]
      let fileType = file.type
      if (!checkType(data.opts.type, fileType)) {
        let err = 'Illegal type: ' + fileType
        // onChanged callback
        data.events.forEach(event => event.onChanged({ type: 'type', err }, '', null))
        data.errorFn && data.errorFn.call(data._self, { type: 'type', err })
        return
      }
      fileReader(file, (err, base64) => {
        if (err) {
          // onChanged callback
          data.events.forEach(event => event.onChanged(err, '', null))
          data.errorFn && data.errorFn.call(data._self, { type: 'error file', err: 'Illegal file:' + file })
          return
        }
        // onChanged callback
        data.events.forEach(event => event.onChanged(null, base64, file))
      })
    }
  })
}
