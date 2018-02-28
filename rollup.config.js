import babel from 'rollup-plugin-babel';
import pkg from './package.json';

export default {
  input: 'src/index.js',
  output:  [{
    format: 'cjs',
    file: pkg.main
  }, {
    format: 'es',
    file: pkg.module
  }],
  plugins: [
    babel({ runtimeHelpers: true }),
  ],
  external: [
    'react'
  ]
};
