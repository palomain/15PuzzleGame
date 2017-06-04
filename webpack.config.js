/**
 * Created by cpalomino on 5/25/2017.
 */
let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let path = require('path');
let HtmlWebpackPlugin  = require('html-webpack-plugin');
let extractCSS = new ExtractTextPlugin('style.css');

//Here I define the dependencies that I want to bundle into vendor.js
const VENDOR_LIBS = [
    "jquery",
    "lodash",
    "react",
    "react-dom"
];

/**
 * Created by carhe on 5/20/2017.
 */
module.exports = {
    devtool: 'source-map',
    entry: {
        bundle: './src/app.jsx',

    },
    output: {
        path : path.join(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
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
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {limit: 40000}
                    },
                    'image-webpack-loader'
                ]
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
        new HtmlWebpackPlugin(({
            template : 'src/index.html'
        })),
        extractCSS
    ]
};