import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'

export default {
  input: './src/index.js',
  output: {
    file: './dist/camera.js',
    format: 'umd',
    name: 'Camera'
  },
  plugins: [
    babel(),
    uglify()
  ]
}