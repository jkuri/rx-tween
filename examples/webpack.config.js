const { resolve } = require('path');
const html = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: resolve(__dirname, 'web', 'example.ts'),
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      { test: /\.ts$/, use: 'ts-loader', exclude: /node_modules/ }
    ]
  },
  plugins: [
    new html({ template: resolve(__dirname, 'web/index.html'), output: resolve(__dirname, 'dist') })
  ],
  devServer: {
    port: 8000,
    open: true
  }
};
