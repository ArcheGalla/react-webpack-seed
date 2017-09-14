import * as webpack from 'webpack';
import * as path from 'path';

const HtmlWebpackPlugin = require('html-webpack-plugin');

const config: webpack.Configuration = {
    entry: {
        app: './src/App.tsx',
        vendors: ['react', 'react-dom']
    },
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
        ]
    },
    resolve: {
        modules: [
            "node_modules",
            path.resolve(__dirname, "src/app")
        ],
        extensions: [".js", ".json", ".ts", ".tsx", ".jsx", ".css"],
        alias: {
            // "module": "new-module",
            // alias "module" -> "new-module" and "module/path/file" -> "new-module/path/file"
            // "only-module$": "new-module",
            // alias "only-module" -> "new-module", but not "only-module/path/file" -> "new-module/path/file"
            // "module": path.resolve(__dirname, "app/third/module.js"),
            // alias "module" -> "./app/third/module.js" and "module/file" results in error
            // modules aliases are imported relative to the current context
        }
    },
    performance: {
        // hints: "warning",
        // maxAssetSize: 200000,
        // maxEntrypointSize: 400000,
    },
    devtool: "source-map",
    context: __dirname,

    target: "web",
    externals: {
        // "react": "React",
        // "react-dom": "ReactDOM"
    },
    stats: "errors-only",
    devServer: {
        // contentBase: path.join(__dirname, 'node_modules'), // boolean | string | array, static file location
        compress: true, // enable gzip compression
        // historyApiFallback: true, // true for index.html upon 404, object for multiple paths
        hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
        https: false, // true for self-signed, object for cert authority
        noInfo: true, // only errors & warns on hot reload
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'My React App',
            filename: 'src/App.html'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendors",
            filename: "vendors.js",
        })
    ]
};

export default config;