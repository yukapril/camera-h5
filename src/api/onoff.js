export default Fn => {
  /**
   * add linstenr
   * @param fn
   */
  Fn.prototype.on = function (fn) {
    let events = this.$$data.events
    if (typeof fn === 'function') events.push(fn)
    return this
  }

  /**
   * remove linstenr
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
