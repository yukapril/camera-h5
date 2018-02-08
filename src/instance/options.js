/**
 * 页面渲染启动拍照元素
 * @param data
 */
export default data => {
  let opts = data.opts || {}
  data.opts = {
    type: opts.type || 'image/jpeg'
  }
}
