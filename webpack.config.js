// webpack.config.js
const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

module.exports = {
  entry: './besperbot.js', // Adjust the entry point as needed
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'besperbot.bundle.js', // Output bundle
    library: 'BesperBot',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.API_ENDPOINT': JSON.stringify(process.env.API_ENDPOINT),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // If using Babel
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};