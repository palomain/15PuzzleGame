/**
 * Created by cpalomino on 5/25/2017.
 */
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const extractCSS = new ExtractTextPlugin('style.css');

/**
 * Created by carhe on 5/20/2017.
 */
module.exports = {
    devtool: 'source-map',
    entry: {
        filename: './src/app.jsx'
    },
    output: {
        path : path.resolve(__dirname, 'build'),
        filename : 'bundle.js',
        publicPath : 'build/'
    },
    module: {

        rules : [
            {
                test: /\.css$/,
                use: extractCSS.extract([ 'css-loader'])
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'

            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            },
            sourceMap: true
        }),
        extractCSS
    ]
};