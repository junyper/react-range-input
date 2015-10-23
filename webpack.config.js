/* eslint no-var: 0 */

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = require('./webpack.base.js');

var BASE_DIR = process.cwd();
var PKG = require(path.resolve(BASE_DIR, 'package.json'));

config.plugins = config.plugins.concat([
  new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
  new HtmlWebpackPlugin({
    title: PKG.name,
    template: path.resolve(BASE_DIR, 'examples/index.html'),
    inject: 'body',
    filename: 'index.html'
  })
]);

if (process.env.MINIFY) {
  config.plugins.push(
    new ExtractTextPlugin(PKG.name + '.css')
  );
}

config.entry = {
  'example-bundle': path.resolve(BASE_DIR, 'examples/index.js'),
  'vendor': [ 'react' ]
};

config.output = {
  path: path.resolve(BASE_DIR, 'examples/__build__'),
  filename: '[name].js',
  publicPath: ''
};

module.exports = config;
