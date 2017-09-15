import * as webpack from 'webpack';
import * as path from 'path';
import {getPlugins} from './webpack/plugins';

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const env:string = process.env.NODE_ENV;

const config: webpack.Configuration = {
    entry: {
        app: './src/App.tsx',
        vendors: ['react', 'react-dom']
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name][hash].js",
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
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {loader: "css-loader"},
                        {loader: "less-loader"}
                    ],
                })
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
        compress: true,
        hot: true,
        https: false,
        noInfo: true,
    },

    plugins: getPlugins(env)
};

export default config;