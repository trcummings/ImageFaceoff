const webpack = require("webpack");
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const { PORT } = require("../config");

require("dotenv").config();

// Add in the bundle analyzer if we passed in the proper env variable to do so
let plugins = [
  new HtmlWebPackPlugin({
    template: "./src/index_template.html",
    filename: "./index.html",
  }),
  new webpack.DefinePlugin({
    "process.env": {
      PORT: JSON.stringify(PORT),
      PIXABAY_API_KEY: JSON.stringify(process.env.PIXABAY_API_KEY),
    },
  }),
];
if (process.env.ANALYZE_WEBPACK_BUNDLE) {
  plugins.push(new BundleAnalyzerPlugin());
}

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "../public"),
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins,
};
