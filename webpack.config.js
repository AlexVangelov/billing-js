module.exports = {
  devtool: 'source-map',
  context: __dirname + "/src",
  entry: {
    "billing": "./index.ts"
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].js",
    libraryTarget: "var",
    library: "billingJs"
  },
  resolve: {
    extensions: ['', '.js', '.ts']
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['ts']
      }
    ]
  },
  externals: {
    "billing": "BillingJs"
  }
}