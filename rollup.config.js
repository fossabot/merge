import babel from 'rollup-plugin-babel'

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/merge.umd.js',
      format: 'umd',
      name: 'merge',
      sourceMap: true
    },
    {
      file: 'dist/merge.js',
      format: 'cjs',
      sourceMap: true
    },
    {
      file: 'dist/merge.es.js',
      format: 'es',
      sourceMap: true
    }
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ],
  watch: {
    include: 'src/**',
    exclude: 'node_modules/**'
  }
}
