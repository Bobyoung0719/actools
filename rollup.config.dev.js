import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import serve from 'rollup-plugin-serve';
import typescript from 'rollup-plugin-typescript2';
import livereload from 'rollup-plugin-livereload';

module.exports = {
  input: './src/main.tsx',
  output: './dev/index.js',
  external: ['react', 'react-dom'],

  plugins: [
    livereload(),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,   
    }),
    typescript({
      useTsconfigDeclarationDir: true
    }),
    postcss(),
  ]
}