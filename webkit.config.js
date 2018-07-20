// Here's a good example: https://github.com/photonstorm/phaser3-project-template

const webpack = require("webpack");

module.exports = ({ mode } = { mode: "production" }) => {
  return {
      mode,
      entry: "./src/index.js",
      output: {
        filename: "bundle.js"
      },
      module: {
        rules: [ ]
      },
      plugins: []
    }
};
