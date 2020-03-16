module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: "./main",
  output: {
    filename: "./js/bundle.js"
  },
  resolve: {
    extensions: [".ts", ".js"]
  }
};
