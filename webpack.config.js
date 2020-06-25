const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackTagsPlugin = require("html-webpack-tags-plugin");

module.exports = {
  mode: "development",
  entry: {
    app: "./src/index.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      /*
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },*/
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "/public/path/to/",
            },
          },
          "css-loader",
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          //"style-loader",
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: true,
      hash: true,
      chunks: ["index"],
      filename: "index.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/vertical-rythm.html",
      inject: true,
      hash: true,
      chunks: ["index"],
      filename: "vertical-rythm.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/bootstrap.html",
      inject: true,
      hash: true,
      chunks: ["index"],
      filename: "bootstrap.html",
    }),
    new HtmlWebpackTagsPlugin({
      tags: ["bundle.js", "app.css"],
      append: true,
      useHash: true,
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
};
