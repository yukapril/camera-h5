/**
 * default options
 * @param data
 */
export default data => {
  const opts = data.opts || {}
  data.opts = {
    type: opts.type || 'image/jpeg',
    capture: opts.capture || 'camera'
  }
}
