/**
 * file reader
 * @param file
 * @param callback
 */
export default (file, callback) => {
  let reader = new window.FileReader()
  reader.onload = e => {
    const result = e.target.result
    reader = null
    callback && callback(null, result)
  }
  reader.onerror = err => {
    reader = null
    callback && callback(err, '')
  }
  reader.readAsDataURL(file)
}
