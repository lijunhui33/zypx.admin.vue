const CompressionWebpackPlugin = require('compression-webpack-plugin')
module.exports = {
	// publicPath: './',
	//设置文件压缩路径 /dist/根据服务器域名决定 如是www.baidu.com则是/ 如果是 www.baidu.com/dist/则需要打包成/dist/
	publicPath: process.env.NODE_ENV === 'production' ? '/dist/' : '/',
	configureWebpack: (config) => {
		if (process.env.NODE_ENV === 'production') { //GZIP压缩
			return {
				plugins: [new CompressionWebpackPlugin({
					test: /\.(js|css)(\?.*)?$/i, //需要压缩的文件正则
					threshold: 240, //文件大小大于这个值时启用压缩
					deleteOriginalAssets: false //压缩后保留原文件
				})]
			}
		}
	},
	devServer: {
		port: 9009,
		proxy: {
			'/api': {
				target: 'https://ggfw.gdhrss.gov.cn', // target表示代理的服务器url
				changeOrigin: true, //允许跨域
				pathRewrite: { // pathRewrite表示路径重写，key表示一个正则，value表示别名 
					'^/api': '' // 即用 '/api'表示'http://localhost:3000/api'
				}
			}
		}
	}
}
