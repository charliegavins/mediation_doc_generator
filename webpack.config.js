var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = ['react'];

module.exports = {
<<<<<<< HEAD
  entry: {
    bundle: './src/index.js',
    vendor: VENDOR_LIBS
  },
=======
  devtool: 'eval',
  entry: [
    './src/index.js'
  ],
>>>>>>> 53dceb2732b052743bdc28375df5cf5929e16fff
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
    use: 'babel-loader',
    test: /\.js$/,
    exclude: /node_modules/
  },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'manifest']
    }),
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
};
