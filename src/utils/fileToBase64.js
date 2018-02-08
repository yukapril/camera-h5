/**
 * 文件转 base64
 * @param file
 * @param next
 */
export default (file, next) => {
  let reader = new window.FileReader()
  reader.readAsDataURL(file)
  reader.onload = e => {
    let result = e.target.result
    reader = null
    next && next(result)
  }
  reader.onerror = () => {
    reader = null
  }
}
