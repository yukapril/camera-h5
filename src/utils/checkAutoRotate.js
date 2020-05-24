export default (next) => {
  let img = document.createElement('img')
  document.body.appendChild(img)

  img.onerror = function () {
    const imageOrientation = window.getComputedStyle(img).imageOrientation
    const isRotate = imageOrientation === 'from-image'
    document.body.removeChild(img)
    img = null
    next && next(isRotate)
  }
  img.src = ''
}
