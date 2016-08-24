const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const modulePaths = Object.keys(require('./package.json').dependencies)
  .reduce((paths, module) => {
    // eslint-disable-next-line global-require
    const includePaths = require(module).includePaths;

    return paths.concat(includePaths);
  }, []);

module.exports = {
  entry: {
    application: path.join(__dirname, 'src', 'webpack'),
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss!sass'),
      },
    ],
  },
  output: {
    filename: 'terra-[name].js',
    path: path.join(__dirname, 'dist'),
  },
  plugins: [new ExtractTextPlugin('terra-[name].css')],
  postcss: [
    autoprefixer({
      browsers: [
        'ie >= 10',
        'last 2 versions',
        'last 2 android versions',
        'last 2 and_chr versions',
        'iOS >= 8',
      ],
    }),
  ],
  resolve: {
    root: modulePaths,
  },
  sassLoader: {
    includePaths: modulePaths,
  },
};
