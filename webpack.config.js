module.exports = {
  entry: "./main",
  output: {
    filename: "./js/bundle.js"
  },
  module: {
    loaders: [
      { 
        test: /\.ts$/, 
        loader: "ts-loader" }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  }
};
