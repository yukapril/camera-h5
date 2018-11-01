export default Fn => {
  /**
   * linstenr
   * @param onChanged
   * @param onChange
   */
  Fn.prototype.on = function (onChanged, onChange) {
    let events = this.$$data.events
    if (typeof onChange !== 'function') onChange = () => {}

    if (typeof onChanged === 'function') {
      events.push({ onChanged, onChange })
    }
    return this
  }

  /**
   * linstenr
   * @param onChanged
   */
  Fn.prototype.off = function (onChanged) {
    let events = this.$$data.events
    if (!onChanged) {
      this.$$data.events = []
    }
    if (typeof onChanged === 'function') {
      this.$$data.events = events.filter(e => e.onChanged !== onChanged)
    }
    return this
  }
}
