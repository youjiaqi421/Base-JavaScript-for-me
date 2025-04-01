const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

// 导入自定义插件
const BuildReportPlugin = require('./src/plugins/BuildReportPlugin')
const ResourceOptimizePlugin = require('./src/plugins/ResourceOptimizePlugin')
const EnvInjectPlugin = require('./src/plugins/EnvInjectPlugin')
const WebpackBuildFlowPlugin = require('./src/plugins/WebpackBuildFlowPlugin')

module.exports = (env, argv) => {
	const isProduction = argv.mode === 'production'

	return {
		// 设置统计信息的展示
		stats: {
			colors: true,
			modules: true,
			reasons: true,
			chunks: true,
			assets: true,
			performance: true,
			timings: true,
			hash: true,
			version: true,
			builtAt: true,
		},
		// 启用构建进度显示
		infrastructureLogging: {
			level: 'info',
			debug: true,
		},
		entry: './src/index.js',
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: isProduction ? 'js/[name].[contenthash:8].js' : 'js/[name].js',
			publicPath: '/',
		},
		devtool: isProduction ? 'source-map' : 'eval-cheap-module-source-map',
		devServer: {
			static: {
				directory: path.join(__dirname, 'public'),
			},
			hot: true,
			port: 8080,
			open: true,
			historyApiFallback: true,
			compress: true,
			client: {
				overlay: {
					errors: true,
					warnings: false,
				},
				progress: true,
			},
			proxy: {
				'/api': {
					target: 'http://localhost:3000',
					changeOrigin: true,
					pathRewrite: {'^/api': ''},
				},
			},
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env'],
						},
					},
				},
				{
					test: /\.css$/,
					use: [isProduction ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader'],
				},
				{
					test: /\.md$/,
					use: ['html-loader', path.resolve(__dirname, './src/loaders/markdown-loader.js')],
				},
				{
					test: /\.ya?ml$/,
					use: path.resolve(__dirname, './src/loaders/yaml-loader.js'),
				},
				{
					test: /\.(png|svg|jpg|jpeg|gif)$/i,
					use: [
						{
							loader: path.resolve(__dirname, './src/loaders/image-compress-loader.js'),
							options: {
								quality: isProduction ? 65 : 80,
							},
						},
					],
					type: 'asset',
					parser: {
						dataUrlCondition: {
							maxSize: 8 * 1024, // 8kb
						},
					},
					generator: {
						filename: 'images/[name].[hash:8][ext]',
					},
				},
				{
					test: /\.(woff|woff2|eot|ttf|otf)$/i,
					type: 'asset/resource',
					generator: {
						filename: 'fonts/[name].[hash:8][ext]',
					},
				},
			],
		},
		plugins: [
			new WebpackBuildFlowPlugin(),
			new CleanWebpackPlugin(),
			new HtmlWebpackPlugin({
				template: './public/index.html',
				favicon: './public/favicon.ico',
				minify: isProduction
					? {
							removeComments: true,
							collapseWhitespace: true,
							removeRedundantAttributes: true,
							useShortDoctype: true,
							removeEmptyAttributes: true,
							removeStyleLinkTypeAttributes: true,
							keepClosingSlash: true,
							minifyJS: true,
							minifyCSS: true,
							minifyURLs: true,
					  }
					: false,
			}),
			isProduction &&
				new MiniCssExtractPlugin({
					filename: 'css/[name].[contenthash:8].css',
					chunkFilename: 'css/[id].[contenthash:8].css',
				}),
			// 添加自定义插件
			new EnvInjectPlugin({
				env: argv.mode, // 使用webpack命令行参数中的mode
				variables: {
					APP_VERSION: require('./package.json').version,
					APP_BUILD_TIME: new Date().toISOString(),
				},
			}),
			new ResourceOptimizePlugin({
				maxSize: 300, // 设置资源大小警告阈值为300KB
				analyzeReport: isProduction, // 仅在生产环境生成报告
			}),
			isProduction &&
				new BuildReportPlugin({
					filename: 'build-stats.json', // 自定义报告文件名
				}),
		].filter(Boolean),
		resolve: {
			extensions: ['.js', '.json'],
			alias: {
				'@': path.resolve(__dirname, 'src'),
			},
		},
		optimization: {
			splitChunks: {
				chunks: 'all',
				name: false,
				cacheGroups: {
					vendors: {
						test: /[\\]node_modules[\\]/,
						priority: -10,
						reuseExistingChunk: true,
					},
					common: {
						minChunks: 2,
						priority: -20,
						reuseExistingChunk: true,
					},
				},
			},
			minimize: isProduction,
			minimizer: [
				new TerserPlugin({
					terserOptions: {
						parse: {
							ecma: 8,
						},
						compress: {
							ecma: 5,
							warnings: false,
							inline: 2,
						},
						output: {
							ecma: 5,
							comments: false,
						},
					},
				}),
				new CssMinimizerPlugin(),
			],
			runtimeChunk: 'single',
		},
	}
}
