/* eslint no-var: 0 */
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var cssLoaders = 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss';

var config = {
  module: {
    preLoaders: [
      {
        test: /\.js?$/,
        loader: 'eslint',
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel?optional=runtime&stage=2'
      }
    ]
  },

  postcss: [
    // Plugins seem to be first in last out
    // https://github.com/postcss/postcss#plugins
    require('webpack-postcss-tools').prependTildesToImports,

    require('autoprefixer')({ browsers: ['last 2 versions'] }),

    require('postcss-discard-comments')(),

    require('postcss-mixins')(),
    require('postcss-nested')(),
    require('postcss-simple-vars')(),
    require('postcss-color-function')(),

    require('postcss-calc')(),

    require('postcss-url')({
      url: 'inline'
    })
  ],

  plugins: []
};

if (process.env.MINIFY) {
  config.module.loaders = config.module.loaders.concat([
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', cssLoaders)
    }
  ]);
  config.plugins = config.plugins.concat(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: {
        except: ['require', 'export', '$super']
      },
      compress: {
        warnings: false,
        sequences: true,
        dead_code: true,
        conditionals: true,
        booleans: true,
        unused: true,
        if_return: true,
        join_vars: true,
        drop_console: true
      }
    })
  );
  config.postcss = config.postcss.concat([ // these need to run after the nested plugin
    require('csswring'),
    require('postcss-discard-duplicates')()
  ]);
} else {
  config.module.loaders = config.module.loaders.concat([
    {
      test: /\.css$/,
      loader: 'style!' + cssLoaders
    }
  ]);
}

module.exports = config;
