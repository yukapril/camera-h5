/**
 * get file size via base64
 * @param base64
 */
export default base64 => {
  let str = base64.split(',')[1]
  str = str.replace(/=/g, '')
  return str.length / 4 * 3
}
