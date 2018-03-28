var ExtractTextPlugin = require("extract-text-webpack-plugin");  
var HtmlWebpackPlugin = require('html-webpack-plugin');

//获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name){
    return{
        template : './src/view/'+name+'.html',
            filename : 'view/'+name+'.html',
            inject   : true,
            hash     : true,
            chunks   : [name]
    };
};


// webpack config
var config = {
    entry: {
        index: ['./src/page/index/index.js'],
        login: ['./src/page/login/index.js'],
    },
    output: {
        filename: 'js/[name].js',
        path: __dirname + '/dist',
        publicPath:'/dist'
    },
    module:{
        rules:[
        {
            test:/\.css$/,
            use:ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader"
            })
        },
        {
            test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, 
            use: 'url-loader?limit=100&name=resource/[name].[ext]' 
        },
        ]
    },

    plugins:[
        //把css单独打包到文件里
        new ExtractTextPlugin("css/[name].css"),
        //html模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login')),
    ]
};


module.exports = config;