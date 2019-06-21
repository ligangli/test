const path = require("path");
const merge = require('webpack-merge');
const common = require('./webpack.config.js');
// const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


console.log("222:" + process.env.NODE_ENV)
module.exports =merge(common,{
	mode: 'production',
	module:{
		rules: [
			{
            test: /\.css$/,
            use : [
							// MiniCssExtractPlugin.loader,
							// { loader: "style-loader" },
							{
								loader:MiniCssExtractPlugin.loader,
								options:{
									publicPath: '../',
								}
							},
							{ loader: "css-loader" }
            ]
        },
        {
            test: /\.scss$/,
            use : [
                // MiniCssExtractPlugin.loader,
								// { loader: "style-loader" },
								{
									loader:MiniCssExtractPlugin.loader,
									options:{
										publicPath: '../',
									}
								},
                { loader: "css-loader" },
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
	    filename: 'css/[name].[hash].css',
	    chunkFilename: '[id].[hash].css',
	  }),
	],
})