import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import serve from 'rollup-plugin-serve';
import typescript from 'rollup-plugin-typescript2';
import livereload from 'rollup-plugin-livereload';
import html from '@rollup/plugin-html';
import globals from 'rollup-plugin-node-globals';

module.exports = {
  input: './src/main.ts',
  output: {
    file: './dist/index.js',
    format: 'umd',
    name: 'React'
  },
  watch: {
    include: './src/**'
  },
  external: /node_modules/,
  plugins: [
    resolve(),
    livereload(),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,   
    }),
    commonjs(),
    typescript({
      useTsconfigDeclarationDir: true
    }),
    postcss(),
    html(),
    globals(),
    serve({contentBase: 'dist'})
  ]
}
