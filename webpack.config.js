const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/main.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'UNI',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(c|sc)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,  
              outputPath: 'images/'  
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx', 'jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({template: './temp.html'})
  ]
}