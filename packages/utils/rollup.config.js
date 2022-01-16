import { defineConfig } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import clear from 'rollup-plugin-clear';
import pkg from './package.json';

export default defineConfig([
  {
    input: 'src/index.ts',
    output: {
      name: pkg.name,
      file: pkg.browser,
      format: 'umd'
    },
    plugins: [
      clear({
        targets: ['dist'],
        watch: true
      }),
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' })
    ]
  },
  {
    input: 'src/index.ts',
    output: [
      { file: pkg.main, format: 'cjs', exports: 'auto' },
      { file: pkg.module, format: 'es' }
    ],
    plugins: [commonjs(), typescript({ tsconfig: './tsconfig.json' })]
  }
]);
