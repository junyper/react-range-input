/* eslint no-var: 0 */

var config = require('./webpack.base.js');

config.cache = true;
config.devtool = 'inline-source-map';

module.exports = config;
