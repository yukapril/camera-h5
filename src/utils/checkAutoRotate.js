/**
 * check img support rotate
 * @param next
 */
export default (next) => {
  let img = document.createElement('img')

  img.onerror = function () {
    const imageOrientation = window.getComputedStyle(img).imageOrientation
    const isRotate = imageOrientation === 'from-image'
    document.body.removeChild(img)
    img = null
    next && next(isRotate)
  }

  document.body.appendChild(img)
  img.src = ''
}
