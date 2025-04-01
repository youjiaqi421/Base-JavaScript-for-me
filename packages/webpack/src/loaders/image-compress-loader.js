const imagemin = require('imagemin')
const imageminPngquant = require('imagemin-pngquant')
const imageminMozjpeg = require('imagemin-mozjpeg')
const imageminGifsicle = require('imagemin-gifsicle')
const loaderUtils = require('loader-utils')
const {Buffer} = require('buffer')

module.exports = function (source) {
	// 设置loader为异步模式
	const callback = this.async()
	const options = {
		plugins: [
			imageminMozjpeg({quality: 75}),
			imageminPngquant({quality: [0.65, 0.8]}),
			imageminGifsicle({optimizationLevel: 3}),
		],
		...this.getOptions(),
	}

	// 获取文件扩展名
	const ext = this.resourcePath.split('.').pop().toLowerCase()

	// 只处理图片文件
	if (!['png', 'jpg', 'jpeg', 'gif'].includes(ext)) {
		return callback(null, source)
	}

	// 压缩图片
	imagemin
		.buffer(source, options)
		.then(data => {
			const originalSize = source.length
			const optimizedSize = data.length
			const saved = originalSize - optimizedSize
			const percent = (saved / originalSize) * 100

			if (this.mode === 'development') {
				console.log(
					`图片压缩: ${this.resourcePath} - 原始大小: ${originalSize} 字节, ` +
						`压缩后: ${optimizedSize} 字节, 节省: ${percent.toFixed(2)}%`
				)
			}

			callback(null, data)
		})
		.catch(err => {
			callback(err)
		})
}

// 确保webpack将loader处理的文件视为二进制数据
module.exports.raw = true
