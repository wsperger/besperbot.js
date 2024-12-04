// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/besperbot.cjs.js',
      format: 'cjs',
    },
    {
      file: 'dist/besperbot.esm.js',
      format: 'es',
    },
    {
      file: 'dist/besperbot.umd.js',
      format: 'umd',
      name: 'BesperBot',
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
  ],
};