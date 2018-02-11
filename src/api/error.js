export default Fn => {
  /**
   * error handler
   * @returns {*}
   */
  Fn.prototype.error = function (fn) {
    this.$$data.errorFn = fn
    return this
  }
}
