/**
 * default options
 * @param data
 */
export default data => {
  let opts = data.opts || {}
  data.opts = {
    type: opts.type || 'image/jpeg'
  }
}
