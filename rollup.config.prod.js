import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import {terser} from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';
import url from '@rollup/plugin-url';
import autoprefixer from 'autoprefixer';

const pkg = require('./package.json');

module.exports = {
  input: './src/app.tsx',
  output: [
    {file: pkg.module, format: 'es', sourcemap: true},
    {file: pkg.main, name: 'tools', format: 'umd', sourcemap: true}
  ],
  external: ['react', 'react-dom'],
  plugins: [
    json(),
    typescript({useTsconfigDeclarationDir: true}),
    resolve({browser: true}),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true, 
      babelHelpers: 'bundled'  
    }),
    postcss({
      minimize: true,
      plugins: [autoprefixer()]
    }),
    url({limit: Infinity}),
    terser()
  ]
}