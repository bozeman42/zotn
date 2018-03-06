const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/scripts/client.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    compress: true,
    port: 3000,
    stats: 'errors-only',
    open: true
  },
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
    poll: 1000,
    aggregateTimeout: 300
  },
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: ['style-loader','css-loader','sass-loader']
      },
      {
        test: /\.(png|mp3)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
            publicPath: '',
            context: './src/'
          }
        }]
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
            publicPath: '/',
            context: './src/'
          }
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      minify: {
        collapseWhitespace: true
      },
      hash: true,
      template: './src/index.ejs'
    })
  ]
}