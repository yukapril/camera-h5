import babel from '@rollup/plugin-babel'
import terser from '@rollup/plugin-terser'

export default {
  input: './src/index.js',
  output: {
    file: './dist/camera.min.js',
    format: 'umd',
    name: 'Camera'
  },
  plugins: [
    babel({
      presets: ['@babel/preset-env']
    }),
    terser()
  ]
}
