const path = require('path');

module.exports = {
  entry: "./build/index.js",
  output: {
    path: path.resolve(__dirname, 'html'),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/, use: 'css-loader'
      },
      {
        test: /\.js$/,
        exclude: [path.resolve(__dirname, 'node_modules/tscomponents/node_modules')]
      }
    ]
  },
  resolve: {
    alias: {
      "@material-ui": path.resolve('./node_modules/@material-ui'),
      react: path.resolve('./node_modules/react')
    }
  }
};
