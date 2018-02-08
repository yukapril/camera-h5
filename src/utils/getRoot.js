/**
 * 获取父元素
 * @param element
 */
export default element => {
  if (typeof element === 'string') element = document.querySelector(element)
  return element
}
