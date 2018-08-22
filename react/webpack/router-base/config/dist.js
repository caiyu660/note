'use strict';

const path = require('path');
const webpack = require('webpack');
const baseConfig = require('./base');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

let config = Object.assign({
    mode: 'production',
    entry: {
        vendor: [
            'babel-polyfill',
            'react',
            'react-dom'
        ],
        app: ['./src/index']
    },
    output: {
        path: path.join(__dirname, '/../dist'),
        filename: 'scripts/[name].[chunkhash:8].js',
        chunkFilename: "scripts/modules/[name].[id].[chunkhash].js"
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '/../src/index.html')
        }),
        new ExtractTextPlugin({
            filename: 'styles/app.[hash:8].css',
            allChunks: true,
            disable: false
        }),
        // webpack4弃用 
        // new webpack.optimize.CommonsChunkPlugin({
        //     names: ['vendor', 'manifest']
        // })
    ]
}, baseConfig);

module.exports = config;