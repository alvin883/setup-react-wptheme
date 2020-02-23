const webpack = require("webpack")
const path = require("path")
const merge = require("webpack-merge")

/**
 * Overal Configuration
 *
 * Write your configuration here!
 * Avoid Production or Development configuration, unless if it necessary
 */
const config = {
  entry: "./src/App.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  }
}

/**
 * Development Configuration
 */
const devConfig = merge(config, {
  mode: "development",

  // Webpack Dev Server Configuration
  devServer: {
    // Where to look the static files
    contentBase: path.join(__dirname, "assets"),

    // URL for server
    host: "0.0.0.0",
    port: 3000,

    // Hot Module Replacement(HMR)
    hot: true,

    // Logging level in the CLI
    clientLogLevel: "silent"
  }
})

/**
 * Production Configuration
 */
const prodConfig = merge(config, {
  mode: "production"
})

module.exports = {
  development: devConfig,
  production: prodConfig
}
