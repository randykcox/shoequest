// Here's a good example: https://github.com/photonstorm/phaser3-project-template

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = ({ mode } = { mode: "development" }) => {
  return {
      mode: mode,
      entry: "./src/index.js",
      output: {
        path: __dirname + '/dist',
        filename: "main.js"
      },
      module: {
        rules: [
          {
            test: /\.png$/,
            use: [{ loader: "file-loader", options: { } }]
          }

        ]
      },
      plugins: [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
          filename: 'index.html',
          title: 'Shoe Quest',
          hash: true
        }),
        new webpack.DefinePlugin({
          // Get the version # from package.json and set as a global variable
          VERSION: JSON.stringify(require('./package.json').version)
        })
      ]
    }
};
