/**
 * Created by cpalomino on 5/25/2017.
 */
const webpack = require('webpack');
/**
 * Created by carhe on 5/20/2017.
 */
module.exports = {
    devtool: 'source-map',
    entry: {
        filename: './src/app.js'
    },
    output: {
        filename: '_build/bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015-native-modules']
                }
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
        })
    ]
};