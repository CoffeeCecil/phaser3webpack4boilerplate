const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports={
	//document src.
	entry:{
		vendor: ['phaser'],
		app: './src/index.js'//application entry location.
	}
	,
	//where you expect the output to be.
	output: {
		//generate an absolute path.
		path: path.resolve(__dirname, 'build'),
		filename: '[name].chunkhash.bundle.js',
		//create a bundle in the build directory
		chunkFilename: '[name].chunkhash.bundle.js',
		publicPath:'/',
	}
	,
	//module handles building of a file.
	module:{
		rules:[{
			test: /\.js$/,
			include: path.resolve(__dirname, 'src'),
			use: {
				loader: 'babel-loader',
				options:{
					presets: ['env']
				}
			}
		}]
		//end of rules
	},
	//dev server will automatically host the js.
	devServer:{
		contentBase: path.resolve(__dirname,'build'),
		host: '127.0.1.1' || config.dev.host, // Change the host here
		port: 8080 || config.dev.port,
	},
	//this copy plugin gives devserver something to visualize js in.
	plugins:[
		new CopyWebpackPlugin([
		{
			from: path.resolve(__dirname, 'index.html'),
			to: path.resolve(__dirname, 'build')
			
		}
		/*
		//copy all asset files from an assets directory.
		,
		{
			from: path.resolve(__dirname, 'assets', '**', '*'),
			to: path.resolve(__dirname,'build')
		}
		*/
		]),
		//set rendering variables to true.
		new webpack.DefinePlugin({
			WEBGL_RENDERER: true,
			CANVAS_RENDERER: true
		}),
	],
	//new style of chunking code.
	optimization:{
		splitChunks:{
			cacheGroups:{
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendor',
					chunks: 'all',
					enforce:true
				}
			}
		},
		runtimeChunk: true
	},
	
	
};


