import checkAutoRotate from '../utils/checkAutoRotate'

export default Fn => {
  Fn.isRotated = next => checkAutoRotate(next)
}
