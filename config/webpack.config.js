const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');
//引入glob
var glob= require('glob');

//同步读取src目录下所有的html文件
var files = glob.sync('./src/**/*.html');
var entry={};
var plugins = [
	new CleanWebpackPlugin({
　　　　root:path.resolve(__dirname,'../dist'),     //根目录
　　　　verbose:true,            //是否启用控制台输出信息
　　　　dry:false                                  //设置为false,启用删除文件
　　})
]
// //循环将文件
files.forEach(function(item,i){
    //item类似：./src/index.html
    var htmlName=item.slice(item.lastIndexOf("/")+1);
    //最后生成的文件名只需要最后面的名字index.html
    
    var name=htmlName.split(".")[0];
		console.log("1231231231:"+name)
    //添加到entry入口，并制定生成文件的目录
		entry[name]='./src/js/'+name+'.js'     // 打包入口路径不对导致输出遇到的问题
    //生成htmlWebpackPlugin实例
    plugins.push(
        new HtmlWebpackPlugin({
            template:item,
            filename:'page/'+htmlName,
						chunks:[name],
        })
    )
});

plugins.push(
	 new webpack.HotModuleReplacementPlugin()
)
module.exports = {
	entry:entry,
	output:{
		path:path.resolve(__dirname,'../dist'),
		filename:'js/[name].js'
	},
	plugins:plugins,
	module:{
		rules:[
			 {
				test:/\.html$/,
				use:[
					{
						loader:"html-loader",
						options:{
							attrs: ['img:src', 'img:data-src', 'audio:src']  //此处的参数值  img是指html中的 <img/> 标签， src是指 img的src属性   表示 html-loader 作用于 img标签中的 src的属性
						}
					}
				]
			},
			{
				test:/\.js$/,
				exclude:/node_modules/,
				use:{
						loader:'babel-loader',
						options:{
							presets:['@babel/preset-env']
						}
				}
			}
		]
	}
}