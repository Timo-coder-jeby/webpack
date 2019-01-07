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

module.exports = merge(common,{
  //配置所有的loader
  module: {
    rules: [
      //编译less--->css-->style
      {
        test: /\.less$/, //定义该loader匹配哪些文件（处理谁）
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader","less-loader"]
        })
      },
    ]
  },

  //配置所有的插件
  plugins: [
    //编译less为css，合并css，并提取css为一个单独的文件
    new ExtractTextPlugin("./css/index.css"),
    new CleanWebpackPlugin('./build',{
      root:resolve(__dirname,'../')
    })

  ]


});