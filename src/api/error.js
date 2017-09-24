export default Fn => {
  /**
   * 监听错误函数
   * @returns {*}
   */
  Fn.prototype.error = function (fn) {
    this.$$data.errorFn = fn
    return this
  }
}
