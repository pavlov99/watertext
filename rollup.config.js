import pkg from './package.json';
import buble from 'rollup-plugin-buble';
import uglify from 'rollup-plugin-uglify';

/** Build "core" and "regular" versions: umd + commonjs + es6 modules */
export default [
  {
    input: 'core.js',
    output: {
      file: `dist/${pkg.name}.core.umd.min.js`,
      format: 'umd',
      name: pkg.name
    },
    plugins: [
      buble({
        exclude: ['node_modules/**']
      }),
      uglify()
    ]
  }, {
    input: 'core.js',
    output: [
      {
        file: `dist/${pkg.name}.core.cjs.js`,
        format: 'cjs'
      }, {
        file: `dist/${pkg.name}.core.esm.js`,
        format: 'es'
      }
    ],
    plugins: [
      buble({
        exclude: ['node_modules/**']
      })
    ]
  }, {
    input: 'index.js',
    output: {
      file: pkg.browser,
      format: 'umd',
      name: pkg.name
    },
    plugins: [
      buble({
        exclude: ['node_modules/**']
      }),
      uglify()
    ]
  }, {
    input: 'index.js',
		output: [
			{
        file: pkg.main,
        format: 'cjs'
      }, {
        file: pkg.module,
        format: 'es'
      }
    ],
    plugins: [
      buble({
        exclude: ['node_modules/**']
      })
    ]
  }
]
