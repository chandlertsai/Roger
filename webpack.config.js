const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");
const proxy = require("http-proxy-middleware");
module.exports = {
  //context: path.resolve(__dirname, "src"),
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "less-loader", options: { javascriptEnabled: true } }
        ]
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      components: path.resolve(__dirname, "src/components/"),
      css: path.resolve(__dirname, "src/css/"),
      asset: path.resolve(__dirname, "src/asset/"),
      apis: path.resolve(__dirname, "src/apis/"),
      reducers: path.resolve(__dirname, "src/reducers"),
      actions: path.resolve(__dirname, "src/actions")
    }
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      filename: "./index.html"
    })
  ],
  devServer: {
    port: 3000,
    historyApiFallback: true,
    proxy: {
      "/api": "http://localhost:3001"
    }
    //   '/qpe': {
    //     target: 'http://localhost:8080',
    //     changeOrigin: true
    //   }
    // }
  }
};
