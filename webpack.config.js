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
      asset: path.resolve(__dirname, "src/asset/"),
      apis: path.resolve(__dirname, "src/apis/"),
      reducers: path.resolve(__dirname, "src/reducers"),
      actions: path.resolve(__dirname, "src/actions"),
      routers: path.resolve(__dirname, "src/routers"),
      store: path.resolve(__dirname, "src/store")
    }
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      filename: "./index.html"
    })
  ],
  devServer: {
    port: 4000,
    historyApiFallback: true,
    proxy: {
      "/api": "http://localhost:3001",
      "/apis": "http://localhost:3001"
    }
    //   '/qpe': {
    //     target: 'http://localhost:8080',
    //     changeOrigin: true
    //   }
    // }
  }
};
