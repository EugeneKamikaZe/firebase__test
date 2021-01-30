const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const miniCss = require('mini-css-extract-plugin')

module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/js/app.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
    devServer: {
        port: 3000,
        overlay: true
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(s*)css$/,
                use: [
                    miniCss.loader,
                    'css-loader',
                    'sass-loader',
                ]
            }
        ],
    },
    plugins: [
        new HTMLPlugin({
            template: './src/index.html'
        }),
        new CleanWebpackPlugin(),
        new miniCss({
            filename: 'main.css'
        })
    ],
}