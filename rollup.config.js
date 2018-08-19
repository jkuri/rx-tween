import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

const plugins = [
  typescript(),
  nodeResolve(),
  commonjs()
];

export default [
  {
    input: 'src/index.ts',
    output: {
      name: 'tween',
      file: pkg.browser,
      format: 'umd'
    },
    plugins: plugins
  },
  {
    input: 'src/index.ts',
    plugins: plugins,
    external: ['rxjs', 'rxjs/operators'],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ]
  }
];
