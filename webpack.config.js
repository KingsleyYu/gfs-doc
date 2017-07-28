var webpack = require('webpack');
var path = require('path');
var extend = require('extend');
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')


const pkg = require('./package.json')
const docConfig = require('./docConfig.js');


const PATH = {
    TEMPLATE: path.resolve(__dirname, './theme/template'),
    DOC: path.resolve(__dirname, './doc')
}

var OUTPUT = path.resolve(__dirname, 'doc/' + pkg.version); // output目录


module.exports = {
    devtool: 'source-map',
    entry: {
        index: [path.join(PATH.TEMPLATE, 'react/index.js')]
    },
    output: {
        path: __dirname + '/doc/1.0.0/',//输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
        publicPath: '/doc/1.0.0/',       // 模板、样式、脚本、图片等资源对应的server上的路径
        filename: 'bundle.js'     // 每个页面对应的主js的生成配置
    },
    resolve: {
        alias: {
            docConfig: path.join(__dirname, 'doc', pkg.version, 'doc'),
            component: path.join(__dirname, docConfig.project.entry)
        },
        extensions: ['', '.js', '.less', '.jsx', '.json']
    },
    module: {
        loaders: [{
            test: /\.js|.jsx$/,
            loaders: ['babel'],
            exclude: /node_modules/
        }, {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
        }, {
            test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
            loader: 'file-loader?name=./iconfont/[name].[ext]'
        },
        {
            test: /\.(jpe?g|png|gif|svg|ico)/,
            loader: 'url-loader?limit=999999'
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        },
        {
            test: /\.md$/,
            loader: 'babel!markdown-it-gfs-loader'
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('css/[name].css'),
        new HtmlWebpackPlugin({
            title: docConfig.project.name,
            template: './theme/index.html'
        })
    ]
}    