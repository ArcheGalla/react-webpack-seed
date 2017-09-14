import * as webpack from 'webpack';
import * as path from 'path';

const HtmlWebpackPlugin = require('html-webpack-plugin');

const config: webpack.Configuration = {
  entry: './src/App.tsx',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader"
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "less-loader"
          }
        ],
      }
    ],

    resolve: {
      modules: [
        "node_modules",
        path.resolve(__dirname, "src/app")
      ],
      // directories where to look for modules

      extensions: [".js", ".json", ".ts", ".tsx", ".jsx", ".css"],
      // extensions that are used

      alias: {
        // a list of module name aliases

        // "module": "new-module",
        // alias "module" -> "new-module" and "module/path/file" -> "new-module/path/file"

        // "only-module$": "new-module",
        // alias "only-module" -> "new-module", but not "only-module/path/file" -> "new-module/path/file"

        // "module": path.resolve(__dirname, "app/third/module.js"),
        // alias "module" -> "./app/third/module.js" and "module/file" results in error
        // modules aliases are imported relative to the current context
      },
      /* alternative alias syntax (click to show) */

      /* Advanced resolve configuration (click to show) */
    },
    performance: {
      hints: "warning", // enum
      maxAssetSize: 200000, // int (in bytes),
      maxEntrypointSize: 400000, // int (in bytes)
      assetFilter: function (assetFilename) {
        // Function predicate that provides asset filenames
        return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
      }
    },
    devtool: "source-map", // enum
    // enhance debugging by adding meta info for the browser devtools
    // source-map most detailed at the expense of build speed.

    context: __dirname, // string (absolute path!)
    // the home directory for webpack
    // the entry and module.rules.loader option
    //   is resolved relative to this directory

    target: "web", // enum
    // the environment in which the bundle should run
    // changes chunk loading behavior and available modules

    // externals: ["react", /^@angular\//],
    // Don't follow/bundle these modules, but request them at runtime from the environment

    stats: "errors-only",
    // lets you precisely control what bundle information gets displayed

    devServer: {
      // proxy: { // proxy URLs to backend development server
      //  '/api': 'http://localhost:3000'
      // },
      // contentBase: path.join(__dirname, 'public'), // boolean | string | array, static file location
      compress: true, // enable gzip compression
      // historyApiFallback: true, // true for index.html upon 404, object for multiple paths
      hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
      https: false, // true for self-signed, object for cert authority
      noInfo: true, // only errors & warns on hot reload
    },

    plugins: [
      new HtmlWebpackPlugin()
    ]
  }
};

export default config;