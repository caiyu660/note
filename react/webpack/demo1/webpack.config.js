const path = require('path');
const sassPath = path.join(__dirname, 'src/sass');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules:[
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'sass-loader',
                        {
                            loader: 'sass-resources-loader',
                            options: {
                                resources: [
                                    sassPath + '/_mixins.scss'
                                ]
                            }
                        }
                    ]
                })
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new ExtractTextPlugin({
            filename: 'styles/app.[hash:8].css',
            disable: true,
            allChunks: true
        }),
        new HtmlWebpackPlugin()
    ]
}
//file-loader
//url-loader