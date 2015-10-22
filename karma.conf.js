/* eslint no-var: 0 */

var fs = require('fs');
var path = require('path');
var REGEX_TEST = /\-test\.js$/;

function findTests(dir) {
  var tests = [];
  fs.readdirSync(dir).forEach(function(file) {
    var resolvedFile = path.resolve(dir, file);
    var stat = fs.statSync(resolvedFile);
    if (stat && stat.isDirectory()) {
      tests = tests.concat(findTests(resolvedFile));
    } else if (REGEX_TEST.test(resolvedFile)) {
      tests.push(resolvedFile);
    }
  });
  return tests;
}

module.exports = function(config) {
  var tests = findTests(path.resolve(process.cwd(), 'lib'));
  var conf = {
    basePath: '',

    frameworks: ['mocha'],

    files: tests,

    preprocessors: {},

    reporters: ['dots'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['Chrome'],

    captureTimeout: 60000,

    singleRun: true,

    webpack: {
      cache: true,
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
          }
        ]
      }
    },

    webpackServer: {
      stats: {
        colors: true
      }
    }
  };

  tests.forEach(function(test) {
    conf.preprocessors[test] = ['webpack', 'sourcemap'];
  });

  config.set(conf);
};
