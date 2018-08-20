const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const bootstrapEntryPoints = require('./webpack.bootstrap.config.js');

module.exports = {
    //context: path.resolve(__dirname, 'src'),
    entry: [
        'webpack-dev-server/client?http://localhost:9000',
        'webpack/hot/only-dev-server',
        path.resolve(__dirname, './src/scripts/main.js')
    ],
    output: {
        path: __dirname + '/dist',
        filename: 'index.bundle.js',
        publicPath: '/'
    },
    devtool: 'source-map',
    target: 'web',
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        compress: true,
        port: 9000,
        hot: true
        //stats: "errors-only"
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                include: path.join(__dirname, 'src'),
                loader: "babel-loader",
                query: {
                    presets: ["es2015", "react", "stage-2"]
                }
            },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            {
                test: /\.scss$/,
                use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader', 'sass-loader']
                }))
            },
            {
                test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'url-loader?limit=10000',
            },
            {
                test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
                use: 'file-loader',
            },
            {
                test: /bootstrap-sass\/assets\/javascripts\//,
                use: 'imports-loader?jQuery=jquery'
            }
        ]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin({
            filename: 'dist/styles/index.css',
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            title: 'React Practice 2',
            hash: true,
            template: './src/index.html'
        }),
        new webpack.ProvidePlugin({
            //'window.Tether': 'tether',
            $: "jquery",
            jQuery: 'jquery'
        })
    ]
};