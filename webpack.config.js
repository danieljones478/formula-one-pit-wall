/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    entry: "./index.tsx",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: isProduction ? "bundle.[contenthash].js" : "bundle.js",
      clean: true, // Cleans the output directory before each build
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        favicon: "./public/favicon.ico",
      }),
      new CleanWebpackPlugin(), // Cleans the output directory
      !isProduction && new ReactRefreshWebpackPlugin(), // Add React Refresh in development
    ].filter(Boolean),
    devtool: isProduction ? "source-map" : "inline-source-map",
    devServer: {
      static: {
        directory: path.resolve(__dirname, "public"), // Serve files from the "public" folder
        serveIndex: false, // Disable directory listing
      },
      port: 3000,
      open: true,
      hot: true, // Enable Hot Module Replacement
      historyApiFallback: true, // Redirect 404s to index.html
    },
    mode: isProduction ? "production" : "development",
  };
};