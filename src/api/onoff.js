export default Fn => {
  /**
   * 监听内容改变
   * @returns {*}
   */
  Fn.prototype.on = function (fn) {
    let events = this.$$data.events
    if (typeof fn === 'function') events.push(fn)
    return this
  }

  /**
   * 取消事件监听
   * @param fn
   */
  Fn.prototype.off = function (fn) {
    let events = this.$$data.events
    if (!fn) {
      this.$$data.events = []
    }
    if (typeof fn === 'function') {
      this.$$data.events = events.filter(e => e !== fn)
    }
    return this
  }
}
