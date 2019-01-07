//path内置的模块，用来设置路径,node自带的模块，无需下载。
const {resolve} = require('path');
//引入webpack
const webpack = require('webpack');
//引入公共部分js，webpack.common.js
const common = require('./webpack.common')
//引入合并库
const merge = require('webpack-merge')

module.exports = merge(common,{
  //入口（从哪里进入开始解析）
  entry:['./src/js/index.js','./src/index.html'],

  //配置所有的loader
  module: {
    rules: [
      //使用loader加载css
      {
        test: /\.less$/,
        use: [{
          loader: "style-loader" // 创建一个style标签，将js中的css放入其中
        }, {
          loader: "css-loader" // 将css以CommonJs语法打包到js中
        }, {
          loader: "less-loader" // 将less转换成css
        }]
      },
      //html-loader(为了让模块热更新起作用)
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader'
        }
      }
    ]
  },

  //配置所有的插件
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],

  //配置开发服务器
  devServer: {
    hot: true,  //模块热更新（热模替换,也成为HMR）
    open:true,  //自动打开浏览器
    port:3001,  //开发服务器端口号
    compress:true //启用gzip
  }


});