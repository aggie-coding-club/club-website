const nodeExternals = require('webpack-node-externals');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    plugins: [
    new UglifyJsPlugin(),
    new HtmlWebpackPlugin(),
    ],
    entry: './src/App.js',
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },
    module: {
        rules:[
            {
                test: /\.json$/,
                use: 'json-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,

            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 8000, // Convert images < 8kb to base64 strings
                    name: 'images/[hash]-[name].[ext]'
                }
            },
        ]
    },
    node: {
        fs: 'empty'
    },
    target: 'node', // in order to ignore built-in modules like path, fs, etc.
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder

};
