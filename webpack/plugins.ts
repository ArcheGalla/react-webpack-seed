import * as webpack from 'webpack';

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

export function getPlugins(env: string): Array<any> {
    const plugins = [
        new HtmlWebpackPlugin({
            title: 'My React App',
            filename: 'index.html',
            template: 'src/App.ejs'

        }),
        new ExtractTextPlugin({
            filename: "app.[hash].css",
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendors",
            filename: "vendors.js",
        })
    ];

    if (env === 'development') {
        plugins.push(new webpack.HotModuleReplacementPlugin())
    }

    return plugins;
}