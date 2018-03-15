// Webpack must haves
const webpack = require("webpack");
const path = require("path");

// Includes
const DashboardPlugin = require("webpack-dashboard/plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// Enviroment Conditionals
const nodeEnv = process.env.NODE_ENV || "development";
const isProduction = nodeEnv === "production";
const isDevelopment = nodeEnv === "development";


const SRC_DIR = path.resolve(__dirname, 'src/');
const BUILD_DIR = path.resolve(__dirname, 'build/');
const DIST_DIR = path.resolve(__dirname, 'dist/');
const APP_DIR = path.resolve(__dirname, 'src/script/');

const config = {
  context: APP_DIR,

  devServer: {
    contentBase: SRC_DIR,
    historyApiFallback: true,
    host: "localhost",
    port: 8080,
    stats: {
      assets: true,
      children: false,
      chunks: false,
      colors: {
        green: "\u001b[32m"
      },
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: true
    }
  },

  entry: {
    js: "./index.js"
  },

  output: {
    path: SRC_DIR,
    filename: "/build.js"
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ["react-hot", "babel-loader"]
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.scss$/,
        loader: "sass-loader"
      }
    ]
  },

  plugins: new DashboardPlugin()
};

module.exports = config;