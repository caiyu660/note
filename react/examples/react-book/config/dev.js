'use strict';

const path = require('path');
const webpack = require('webpack');
const baseConfig = require('./base');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let config = Object.assign({
    mode: 'development',
    entry: {
        app: ['babel-polyfill', './src/index']
    },
    output: {
        path: path.join(__dirname, '/../dist'),
        filename: 'scripts/[name].[chunkhash:8].js'
    },
    devServer: {
        contentBase: './src',
        port: 9998,
        disableHostCheck: true
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '/../src/index.html')
        }),
        new ExtractTextPlugin({
            filename: 'styles/app.[hash:8].css',
            allChunks: true,
            disable: false
        })
    ]
}, baseConfig);

module.exports = config;