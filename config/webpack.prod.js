//path内置的模块，用来设置路径,node自带的模块，无需下载。
const {resolve} = require('path');
//编译less为css，合并css，并提取css为一个单独的文件
const ExtractTextPlugin = require("extract-text-webpack-plugin");
//用来清空build文件夹
const CleanWebpackPlugin = require('clean-webpack-plugin')
//引入公共部分js，webpack.common.js
const common = require('./webpack.common')
//引入合并库
const merge = require('webpack-merge')
//引入webpack
const webpack = require('webpack')
//压缩css
const CleanCSSPlugin = require("less-plugin-clean-css");
//自动创建一个index.html，并且引入应该引入的资源
const HtmlWebpackPlugin = require('html-webpack-plugin');



module.exports = merge(common,{

  output: {// 输出配置
    path: resolve(__dirname, '../dist'),
    filename: './js/[name].[hash:10].js'

  },
  //配置所有的loader
  module: {
    rules: [
      //编译less--->css-->style
      {
        test: /\.less$/, //定义该loader匹配哪些文件（处理谁）
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader","postcss-loader",{
            loader: "less-loader", options: {
              plugins: [
                new CleanCSSPlugin({ advanced: true })
              ]
            }

          }]
        })

      },


    ]
  },

  //配置所有的插件
  plugins: [
    //编译less为css，合并css，并提取css为一个单独的文件
    new ExtractTextPlugin("./css/[name].[hash:10].css"),
    new CleanWebpackPlugin('./build',{
      root:resolve(__dirname,'../')
    }),
    //丑化js（压缩js）
    new webpack.optimize.UglifyJsPlugin({
      sourceMap:true //生成一个映射文件，便于开发人员查找错误
    }),
    new CleanWebpackPlugin('./dist',{
      root:resolve(__dirname,'../')
    }),
    new HtmlWebpackPlugin({
      title:"webpack",    //就是html文档中的title标签（页签名）
      filename:"index.html", //指定生成文件的名字
      template:"./src/index.html",//生成文件所用的模板（程序员自己写的页面）
      minify:{ removeComments:true, collapseWhitespace:true}

    }),


  ],

  devtool:'source-map'



});