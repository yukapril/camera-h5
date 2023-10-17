import fileReader from './utils/fileReader'

/**
 * check image file type
 * @param legalType
 * @param type
 */
function checkType (legalType, type) {
  const legalTypes = legalType.split(',')
  return legalTypes.indexOf(type) >= 0
}

export const inputTag = (options) => {
  let inputEl = null

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

  const create = () => {
    inputEl = document.createElement('input')
    inputEl.type = 'file'
    inputEl.style.opacity = '0'
    inputEl.style.width = '0'
    inputEl.style.height = '0'
    inputEl.setAttribute('accept', 'image/*')
    if (cap) inputEl.setAttribute('capture', cap)
    document.body.appendChild(inputEl)

    inputEl.addEventListener('click', () => {
      remove()
    })

    inputEl.addEventListener('change', e => {
      options.change(e)

      const files = e.target.files
      if (files.length > 0) {
        const file = files[0]
        const fileType = file.type
        if (!checkType(options.type, fileType)) {
          const err = 'Illegal type: ' + fileType
          options.changed({ type: 'type', err }, '', null)
          return
        }
        fileReader(file, (error, base64) => {
          if (error) {
            options.changed({ type: 'error file', err: 'Illegal file:' + file, error }, '', null)
            return
          }
          options.changed(null, base64, file)
        })
      }
    })

    inputEl.click()
    return inputEl
  }
  const remove = () => {
    if (inputEl && inputEl.parentNode) {
      inputEl.parentNode.removeChild(inputEl)
      inputEl = null
    }
  }

  return { create, remove }
}
