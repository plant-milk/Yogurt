const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader?modules", "sass-loader"],
        include: path.resolve(__dirname, '../')
      }
    ]
  }
}