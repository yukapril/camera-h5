import fileReader from './utils/fileReader'

/**
 * get element
 * @param element
 */
export function getRoot (element) {
  if (typeof element === 'string') element = document.querySelector(element)
  return element
}

/**
 * create input element for camera
 * @param options
 */
export function createInputTag (options) {
  let cap = null
  switch (options.capture) {
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

  const input = document.createElement('input')
  input.type = 'file'
  input.setAttribute('accept', 'image/*')
  if (cap) input.setAttribute('capture', cap)
  input.style.position = 'absolute'
  input.style.top = '0'
  input.style.left = '0'
  input.style.zIndex = '9999'
  input.style.display = 'block'
  input.style.width = '100%'
  input.style.height = '100%'
  input.style.opacity = '0'
  return input
}

/**
 * render input element
 * @param root
 * @param input
 */
export function renderInput (root, input) {
  root.appendChild(input)
}

/**
 * check image file type
 * @param legalType
 * @param type
 */
function checkType (legalType, type) {
  const legalTypes = legalType.split(',')
  return legalTypes.indexOf(type) >= 0
}

/**
 *bind camera element event
 * @param input
 * @param options
 * @param callbackGroup
 */
export function bindEvent (input, options, callbackGroup) {
  input.addEventListener('change', e => {
    callbackGroup.onChange(e)

    const files = e.target.files
    if (files.length > 0) {
      const file = files[0]
      const fileType = file.type
      if (!checkType(options.type, fileType)) {
        const err = 'Illegal type: ' + fileType
        callbackGroup.onChanged({ type: 'type', err }, '', null)
        return
      }
      fileReader(file, (error, base64) => {
        if (error) {
          callbackGroup.onChanged({ type: 'error file', err: 'Illegal file:' + file, error }, '', null)
          return
        }
        callbackGroup.onChanged(null, base64, file)
      })
    }
  })
}
