var path = require('path');
var webpack = require('webpack');
var ExternalsPlugin = webpack.ExternalsPlugin;

module.exports = {
  entry: './src/main.jsx',
  output: {
    path: path.join(__dirname, 'app'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    // preLoaders: [
    //   {
    //     test: /\.(js|jsx)$/,
    //     exclude: /node_modules/,
    //     loader: 'eslint-loader'
    //   }
    // ],
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: ['babel-loader'],
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-runtime']
        }
      },
      {
        test: /\.(scss|css)$/,
        loaders: ['style-loader', 'css-loader?modules', 'sass-loader']
      }, {
        test: /\.(jpg|png)$/,
        loader: 'url-loader'
      }
    ]
  }
}