const fs = require("fs")
const path = require("path")
// const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin")

function findSync(startPath) {
	let result = {}
	function finder(_path) {
		let files = fs.readdirSync(_path)
		files.forEach(val => {
			let fPath = path.join(_path, val)
			let stats = fs.statSync(fPath)
			if (stats.isDirectory()) finder(fPath)
			if (stats.isFile()) {
				if (val === "main.js") {
					const pageName = path.dirname(fPath).split("/").reverse()[0]
					const template = templatePath[pageName] || 'public/index.html'
					let config = {}, configPath = `./${path.join(_path, '/config.js')}`
					try {
						config = require(configPath)
					} catch (error) {
						// console.log(error)
					}
					Object.assign(result, {
						[pageName]: Object.assign({
							entry: fPath,
							template,
							filename: process.env.NODE_ENV === "production" ? `${pageName}/index.html`: `${pageName}.html`,
							title: '',
							cdn:{},
							// inlineSource: ".(js|css)$"
						}, config)
					})
				}
			}
		})
	}
	finder(startPath)
	return result
}

const pages = findSync("./src/pages")
module.exports = {
	publicPath: './',
	devServer: {
		disableHostCheck: true,
	},
	productionSourceMap: false,
	pages,
	chainWebpack: config => {

    config.module
      .rule("images")
      .use("url-loader")
      .loader("url-loader")
      .tap(options => {
        // 修改它的选项...
				options.limit = 1
				options.fallback = {
					loader: 'file-loader',
					options: {
						name: `[name].[hash:8].[ext]`,
						outputPath: (url, resourcePath, context) => {
							const relativePath = path.relative(context, resourcePath);
							const pathName = relativePath.match(/(?<=pages\/).*?(?=\/)/)[0]
							return `img/${pathName}.${url}`;
						},
					}
				}
        return options
			})
		// Object.keys(pages).forEach(entryName => {
		// 	// 干掉preload 和 prefetch 活动页面因为inline js 和 css 如果preload 会导致引入资源被打包进去两次
		// 	config.plugins.delete(`preload-${entryName}`)
		// 	config.plugins.delete(`prefetch-${entryName}`)
		// })
	},
	configureWebpack: {
		externals: {
			'video': 'videojs'
		},

		plugins: [
			// new HtmlWebpackInlineSourcePlugin(),
		],

		resolve: {
			alias: {
				'@': path.resolve(__dirname, 'src'),
			}
		},

		optimization: {
			splitChunks: {
				chunks: 'all',
				maxInitialRequests: 1,
				minSize: 0,
				cacheGroups: {
					vendor: {
						test: /[\\/]node_modules[\\/]/,
						name (module) {
							const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
							return `npm.${packageName.replace('@', '')}`
						}
					}
				}
			}
		}
	}
}


