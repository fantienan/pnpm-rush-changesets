import { defineConfig } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import clear from 'rollup-plugin-clear';
import pkg from './package.json';

export default defineConfig([
  {
    input: 'lib/index.ts',
    output: {
      name: '@forestar/cli',
      file: pkg.browser,
      format: 'umd'
    },
    plugins: [
      clear({
        targets: ['dist'],
        watch: true
      }),
      json(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' })
    ]
  },
  {
    input: 'lib/index.ts',
    output: [
      { file: pkg.main, format: 'cjs', exports: 'auto' },
      { file: pkg.module, format: 'es' }
    ],
    plugins: [json(), typescript({ tsconfig: './tsconfig.json' })]
  }
]);
