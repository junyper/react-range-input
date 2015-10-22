/* eslint no-var: 0 */

var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = require('./webpack.base.js');

var BASE_DIR = process.cwd();
var PKG = require(path.resolve(BASE_DIR, 'package.json'));
var FILE_NAME = PKG.name;

if (process.env.MINIFY) {
  FILE_NAME += '.min';
}

if (process.env.MINIFY) {
  config.plugins.push(
    new ExtractTextPlugin(FILE_NAME + '.css')
  );
}

config.entry = path.resolve(BASE_DIR, PKG.main);

config.output = {
  path: path.resolve(BASE_DIR, 'dist/'),
  filename: FILE_NAME + '.js',
  library: PKG.name,
  libraryTarget: 'umd'
};

config.externals = {
  'react': 'React',
  'react/addons': 'React'
};

module.exports = config;
