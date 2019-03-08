/**
 * create input element for camera
 * @param data
 */
export default data => {
  const capture = data.opts.capture
  let cap = null
  switch (capture) {
    case 'camera':
      cap = 'camera'
      break
    case 'user':
      cap = 'user'
      break
    case 'none':
      cap = ''
      break
    default:
      cap = 'camera'
  }

  let input = document.createElement('input')
  input.type = 'file'
  input.setAttribute('accept', 'image/*')
  if (cap) input.setAttribute('capture', cap)
  input.style.position = 'absolute'
  input.style.top = '0'
  input.style.left = '0'
  input.style.display = 'block'
  input.style.width = '100%'
  input.style.height = '100%'
  input.style.opacity = '0'
  data.input = input
}
