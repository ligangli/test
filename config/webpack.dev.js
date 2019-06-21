const path = require("path");
const merge = require('webpack-merge');
const common = require('./webpack.config.js');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");

// const webpack = require('webpack');
console.log("11111111111111:"+process.env.NODE_ENV)
module.exports =merge(common,{
	mode: 'development',
	devtool: 'cheap-module-eval-source-map',
	 // 配置开发服务器, 并配置自动刷新
	devServer: {
		// 根目录下dist为基本目录
		contentBase: path.resolve(__dirname, '../dist'),
		// publicPath:'./',
		host:"localhost",
		// 自动压缩代码
		compress: true,
    // overlay: true, // 浏览器页面上显示错误
      // inline:true, //实时刷新
		// 服务端口为1208
		port: 8080,
		// 热更新
		// hot: true,
		 // 自动打开浏览器
		open:true
	},
	module:{
		rules: [
			{
				test: /\.css$/,
				use : [
					{
						loader:MiniCssExtractPlugin.loader,
						options:{			// 解决css引入背景图显示问题
							publicPath: '../',
						}
					},
					// { loader: "style-loader" },
					{ loader: "css-loader" },
					{ 
						loader: "postcss-loader"
					}
				]
			},
			{
				test: /\.scss$/,
				use : [
						// MiniCssExtractPlugin.loader,
						{
							loader:MiniCssExtractPlugin.loader,
							options:{
								publicPath: '../',
							}
						},
						// { loader: "style-loader" },
						{ loader: "css-loader" },
						{ 
							loader: "postcss-loader",
// 							options:{
// 								 sourceMap: true,
// 								config: { 
// 									path: 'postcss.config.js' ,// 这个得在项目根目录创建此文件 
// 								}
// 							}
						},
						{ loader: "sass-loader" }
				]
			},
			
		// 实现 url 资源打包
			{
				// 图片文件使用 url-loader 来处理
				test: /\.(png|jpg|jpeg|gif|ttf)$/,
				use: [{
						loader: 'url-loader',
						// options 为可以配置的选项
						options: {
							limit: 8192,
							name: 'img/[name].[ext]',
							publicPath: "../"

							// limit=8192表示将所有小于8kb的图片都转为base64形式
							// （其实应该说超过8kb的才使用 url-loader 来映射到文件，否则转为data url形式）
						}
				}]
			}
		],
	},
	plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'css/[name].css',
      chunkFilename: '[id].css'
    })
  ],
})