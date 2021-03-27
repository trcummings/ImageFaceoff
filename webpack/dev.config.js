const { merge } = require("webpack-merge");

const common = require("./common.config.js");
const { PORT } = require("../config");

module.exports = merge(common, {
  mode: "development",
  devServer: {
    index: "", // specify to enable root proxying
    proxy: {
      context: () => true,
      target: `http://localhost:${PORT}`,
    },
  },
});
