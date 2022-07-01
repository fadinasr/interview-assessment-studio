const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  devtool: "inline-source-map",
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    // Todo: use the below Webpack plugin to copy files from the static directory after building (if needed!)
    // new CopyWebpackPlugin({
    //   patterns: [
    //     { from: 'static' }
    //   ]
    // }),
    new HtmlWebpackPlugin({
      title: "Development",
    }),
  ],
  output: {
    filename: "bundle.js",
    publicPath: "/static/",
  },
};
