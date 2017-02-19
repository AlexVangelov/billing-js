// Copyright (c) 2016 AlexV <email@data.bg>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

var webpack = require('webpack');
var ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

module.exports = {
  devtool: 'source-map',
  context: __dirname + "/src",
  entry: {
    "dynamoDb": "./billing/storable/dynamoDbStore",
    "restApi": "./billing/storable/restApiStore",
    "indexedDb": "./billing/storable/indexedDbStore"
  },
  output: {
    path: __dirname + "/dist",
    filename: "billing.[name]Store.js",
    libraryTarget: "umd",
    library: ["billingJs", "extras", "[name]"],
    umdNamedDefine: true
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.ts']
  },
  module: {
    loaders: [
      { test: /\.ts$/, loader: 'awesome-typescript' },
      { test: /\.json$/, loader: 'json' }
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: {
        keep_fnames: true
      }
    })
  ],
  externals: {
    "billing": "BillingJs"
  }
}