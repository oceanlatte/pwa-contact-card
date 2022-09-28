const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/js/index.js',
  output: {
    filename:'bundle.js',
    path: path.resolve(__dirname,'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      title: 'Webpack Plugin',
    }),
    new WorkboxPlugin.GenerateSW({
      // define do not pre-cache images
      exclude: [/\.(?:png|jpb|jpeg|svg)$/],
      // runtime caching rules
      runtimeCaching: [{
        // match any request that ends with .png, .jpg, .jpeg. or .svg
        urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
        //apply a cache-first strategy
        handler: 'CacheFirst',
        options: {
          // use a custom cache name
          cacheName: 'images',
          // only cache 1 image
          expiration: {
            maxEntries: 1,
          },
        },
      }],
    }),
  ]
};