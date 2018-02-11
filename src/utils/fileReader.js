/**
 * file reader
 * @param file
 * @param next
 */
export default (file, next) => {
  let reader = new window.FileReader()
  reader.onload = e => {
    let result = e.target.result
    reader = null
    next && next(null, result)
  }
  reader.onerror = () => {
    reader = null
    next && next('read file error', '')
  }
  reader.readAsDataURL(file)
}
