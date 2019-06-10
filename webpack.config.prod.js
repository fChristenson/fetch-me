const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "src", "public", "main.tsx"),
  output: {
    path: path.resolve(__dirname, "dist-app", "dist"),
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.tsx?/,
        exclude: /node_modules/,
        loader: "ts-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "app.html",
      path: path.join(__dirname, "dist"),
      template: path.join(__dirname, "app.template.html"),
    })
  ]
};
