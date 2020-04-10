
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundle.js'
	},
	context: path.join(__dirname, 'src'),
	entry: {
		app: ['./app.js', './scss/app.scss']
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].bundle.css'
		})
	],
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,	// use style loader for injecting css in js
					"css-loader",	// can be used for class transformation
					'sass-loader'
				]
			}
		]
	},
	optimization: {
		minimize: false
		// minimzer for css and js minification, default used for js: override by terjsplugin
	}
};

module.exports = config;
