const path = require('path');
<<<<<<< HEAD
const TerserPlugin = require('terser-webpack-plugin');
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
=======
>>>>>>> 48dfc69ee7eb171b2658ba617573a8ca6a157e92
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
<<<<<<< HEAD
  entry: './src/main.tsx',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
=======
  entry: {
    'Pull': './src/components/AlexPulling/index.tsx',
    'Dialog': './src/components/Dialog/index.tsx',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    library: 'components',
    libraryTarget: 'umd'
>>>>>>> 48dfc69ee7eb171b2658ba617573a8ca6a157e92
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
<<<<<<< HEAD
        loader: 'ts-loader'
      },
      {
        test: /\.(sc|c|sa)ss$/,
        use:[
          MiniCssExtractPlugin.loader,
          'css-loader',
=======
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(c|sc)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {importLoaders: 1}
          },
>>>>>>> 48dfc69ee7eb171b2658ba617573a8ca6a157e92
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
<<<<<<< HEAD
  
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx', '.jsx'],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
      ignoreOrder: true
    }),
  ]
};
=======
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx', 'jsx'],
  },
  plugins: [
    new MiniCssExtractPlugin('[name].css')
  ]
}
>>>>>>> 48dfc69ee7eb171b2658ba617573a8ca6a157e92
