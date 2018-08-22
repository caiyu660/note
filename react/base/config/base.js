'use strict';
const path = require('path');
const srcPath = path.join(__dirname, '/../src');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    resolve: {
        modules: [
            path.join(__dirname, '/../src'),
            "node_modules"
        ],
        extensions: [".js",".jsx"]
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.(scss|sass)$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        'css-loader',
                        'sass-loader',
                        {
                            loader: 'sass-resources-loader',
                            options: {
                                resources: [
                                    srcPath + '/styles/_mixins.scss'
                                ]
                            }
                        }
                    ]
                })
            }
        ]
    }
}