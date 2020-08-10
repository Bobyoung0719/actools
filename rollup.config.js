import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from "rollup-plugin-babel";
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import {terser} from 'rollup-plugin-terser';

const pkg = require('./package.json');

module.exports = {
  input: './src/app.tsx',
  output: [
    {file: pkg.module, format: 'es', sourcemap: true},
    {file: pkg.main, format: 'umd', sourcemap: true}
  ],
  external: ['react', 'react-dom'],
  plugins: [
    typescript({
      useTsconfigDeclarationDir: true
    }),
    resolve(),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,   
    }),
    postcss(),
    terser()
  ]
}