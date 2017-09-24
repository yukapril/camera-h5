/**
 * 获取 base64 图片大小
 * @param base64
 */
export default base64 => {
  let str = base64.split(',')[1]
  str = str.replace(/=/g, '')
  return str.length / 4 * 3
}