/**
 * 生成拍照 input 元素
 * @param data
 */
export default data => {
  let input = document.createElement('input')
  input.type = 'file'
  input.setAttribute('accept', 'image/*')
  input.setAttribute('capture', 'camera')
  input.style.position = 'absolute'
  input.style.top = '0'
  input.style.left = '0'
  input.style.display = 'block'
  input.style.width = '100%'
  input.style.height = '100%'
  input.style.opacity = '0'
  data.input = input
}