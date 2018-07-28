const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
/*vue-loader webpack 4 一定需要 必须此种require*/ 
const VueLoaderPlugin = require('vue-loader/lib/plugin');
/*css抽离 webpack 4: npm i extract-text-webpack-plugin@next */ 
const ExtractPlugin = require('extract-text-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

const config = {
	mode: 'development',
	target: 'web',
	entry: path.join(__dirname, 'src/index.js'),  //输入：项目主文件（入口文件）
	output: {
		filename: 'build.[hash:8].js',  //开发环境的写法
		path: path.join(__dirname, 'dist')  //输出路径
	},
	module: {		//配置加载资源
		rules: [	//规则
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.css$/,
				use: [
					'vue-style-loader',
					'style-loader',
					'css-loader',
				]
			},
			{
				test: /\.jsx$/,
				loader: 'babel-loader'
			},
			{
				test: /\.(gif|png|jpe?g|svg)$/,
				loader: 'url-loader',
				options: {
					limit: 1024, // 文件小于1024字节，转换成base64编码，写入文件里面
					name: '[name]-output.[ext]'
				}
			}
		]
	},
	// webpack插件配置
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
		}),
		new HtmlWebpackPlugin(),
		new VueLoaderPlugin()
	]
};

if (isDev) { 
	// 开发模式的配置
	config.module.rules.push({
		test: /\.styl(us)?$/,
		use: [
			'vue-style-loader',
			'css-loader',
			{
				loader: 'postcss-loader',
				options: {
					sourceMap: true
				}
			},
			'stylus-loader'
		]
	});
	config.devtool = '#cheap-module-eval-source-map';
	config.devServer = {
		port: '8888',
		host: 'localhost',
		overlay: {  //webpack编译出现错误，显示到网页上
			errors: true
		},
		// open: true,  // 启动项目自动打开
		hot: true		// 刷新热加载数据
	};
	config.plugins.push(
		new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
	)
} else {
	// 生成环境的配置
	config.entry = {	// 将所用到的类库单独打包
		app: path.join(__dirname, 'src/index.js'),
		vendor: ['vue']
	};
	config.output.filename = '[name].[chunkhash:8].js';
	config.module.rules.push({
		test: /\.styl(us)?$/,
		use: ExtractPlugin.extract({
			fallback: 'vue-style-loader',
			use: [
				'css-loader',
				{
					loader: 'postcss-loader',
					options: {
						sourceMap: true
					}
				},
				'stylus-loader'
			]
		})
	});
	config.plugins.push(
		new ExtractPlugin('styles.[chunkhash:8].css'),
		// webpack 4中已经将 new webpack.optimize.CommonsChunkPlugin移除
		/*new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor'
		})*/
		// webpack相关的代码单独打包
        /*new webpack.optimize.CommonsChunkPlugin({
        	name: 'runtime'
        })*/
	);
	/*new webpack.optimize.CommonsChunkPlugin移除后，使用config.optimization.splitChunks区分打包类库*/ 
	config.optimization = {
        splitChunks: {
            cacheGroups: {                  // 这里开始设置缓存的 chunks
                commons: {
                    chunks: 'initial',      // 必须三选一： "initial" | "all" | "async"(默认就是异步)
                    minSize: 0,             // 最小尺寸，默认0,
                    minChunks: 2,           // 最小 chunk ，默认1
                    maxInitialRequests: 5   // 最大初始化请求书，默认1
                },
                vendor: {
                    test: /node_modules/,   // 正则规则验证，如果符合就提取 chunk
                    chunks: 'initial',      // 必须三选一： "initial" | "all" | "async"(默认就是异步)
                    name: 'vendor',         // 要缓存的 分隔出来的 chunk 名称
                    priority: 10,           // 缓存组优先级
                    enforce: true
                }
            }
        },
        runtimeChunk: true
    }
}

module.exports = config;