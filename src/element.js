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
    inputEl = document.querySelector('#CameraH5Input')

    if (inputEl) {
      if (cap) inputEl.setAttribute('capture', cap)
    } else {
      inputEl = document.createElement('input')
      inputEl.id = 'CameraH5Input'
      inputEl.type = 'file'
      inputEl.style.opacity = '0'
      inputEl.style.width = '0'
      inputEl.style.height = '0'
      inputEl.setAttribute('accept', 'image/*')
      if (cap) inputEl.setAttribute('capture', cap)
      document.body.appendChild(inputEl)
    }

    // 不能点击后移除元素，否则 iOS 会收不到回调事件。缺点是如果用户选择相册/拍照，点击了取消，此时元素不会移除。
    // inputEl.addEventListener('click', () => {
    // remove()
    // })

    inputEl.addEventListener('change', e => {
      console.log('[camera-h5]', '图片发生改变')
      options.change(e)

      const files = e.target.files
      if (files.length > 0) {
        const file = files[0]
        const fileType = file.type
        if (!checkType(options.type, fileType)) {
          const err = 'Illegal type: ' + fileType
          console.log('[camera-h5]', '图片改变完成，checkTypeErr：', err)
          options.changed({ type: 'type', err }, '', null)
          remove()
          return
        }
        fileReader(file, (error, base64) => {
          if (error) {
            console.log('[camera-h5]', '图片改变完成，fileReaderErr：', error)
            options.changed({ type: 'error file', err: 'Illegal file:' + file, error }, '', null)
            remove()
            return
          }
          console.log('[camera-h5]', '图片改变完成，success')
          options.changed(null, base64, file)
          remove()
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
