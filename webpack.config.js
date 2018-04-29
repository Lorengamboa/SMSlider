const path = require('path');
const DIR_SOURCE = './src/index.js';

const DIR_DIST = 'dist';
const TEST_SOURCE = '.test';

module.exports = {
  entry: DIR_SOURCE,
  output: {
    path: path.resolve(__dirname, DIR_DIST), // string
    filename: "sm_slider.js",
    publicPath: "/assets/",
    library: "MyLibrary",
    libraryTarget: "umd",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, "app")
        ],
        exclude: [
          path.resolve(__dirname, "app/demo-files")
        ],
        enforce: "pre",
        enforce: "post",
        loader: "babel-loader",
        options: {
          presets: ["es2016"]
        },
      },
      {
          test:/\.css$/,
          use:['style-loader','css-loader']
      }
    ],
  },
  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname, "app")
    ],
    extensions: [".js", ".json", ".jsx", ".css"],
    alias: {
      "module": "new-module",
      "only-module$": "new-module",
      "module": path.resolve(__dirname, "app/third/module.js"),
    },
  },

  performance: {
    hints: "warning",
    maxAssetSize: 200000,
    maxEntrypointSize: 400000,
    assetFilter: function(assetFilename) {
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    }
  },
  devtool: "source-map",
  context: __dirname,
  target: "web",
  externals: ["react", /^@angular\//],
  stats: "errors-only",
  devServer: {
    proxy: { // proxy URLs to backend development server
      '/api': 'http://localhost:3000'
    },
    contentBase: path.join(__dirname, 'public'), // boolean | string | array, static file location
    compress: true, // enable gzip compression
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    https: false, // true for self-signed, object for cert authority
    noInfo: true, // only errors & warns on hot reload
  },
  watch: true
}
