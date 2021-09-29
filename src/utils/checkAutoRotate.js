/**
 * check img support rotate
 * @param next
 */
export default (next) => {
  let img = document.createElement('img')

  img.onload = function () {
    const imageOrientation = window.getComputedStyle(img).imageOrientation
    const isRotate = imageOrientation === 'from-image'
    document.body.removeChild(img)
    img = null
    next && next(isRotate)
  }

  document.body.appendChild(img)
  // 写入一张1x1图片，不要使用error事件监听，防止全局捕获
  img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAAApJREFUCNdjYAAAAAIAAeIhvDMAAAAASUVORK5CYII='
}
