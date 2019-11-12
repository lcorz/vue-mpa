var fs = require("fs")
const glob = require("glob")

var callbackFile = function(src, dst) {
	fs.rename(src, dst, function(error) {
		if (error) throw error
	})
}

// 复制css目录
glob.sync("./dist/css/*.css").forEach((filepath, name) => {
	let fileNameList = filepath.split(".")
	let fileName = fileNameList[1].split("/")[3] // 多页面页面目录
	let copyName = filepath.split("/")[3]
	let changeDirectory = `./dist/${fileName}/css` // 多页面JS文件存放地址
	fs.exists(changeDirectory, function(exists) {
		if (exists) {
			// 已存在
			callbackFile(filepath, `${changeDirectory}/${copyName}`)
		} else {
			// 不存在
			fs.mkdir(changeDirectory, function() {
				callbackFile(filepath, `${changeDirectory}/${copyName}`)
			})
		}
	})
})

// 复制js目录
glob.sync("./dist/js/*.js").forEach((filepath, name) => {
	let fileNameList = filepath.split(".")
	let fileName = fileNameList[1].split("/")[3] // 多页面页面目录
	let copyName = filepath.split("/")[3]
	let changeDirectory = `./dist/${fileName}/js` // 多页面JS文件存放地址
	fs.exists(changeDirectory, function(exists) {
		if (exists) {
			// 已存在
			callbackFile(filepath, `${changeDirectory}/${copyName}`)
		} else {
			// 不存在
			fs.mkdir(changeDirectory, function() {
				callbackFile(filepath, `${changeDirectory}/${copyName}`)
			})
		}
	})
})

// 复制img目录
glob.sync("./dist/img/*").forEach((filepath, name) => {
	let fileNameList = filepath.split(".")
	let fileName = fileNameList[1].split("/")[3] // 多页面页面目录
	let copyName = filepath.split("/")[3]
	let changeDirectory = `./dist/${fileName}/img` // 多页面IMG文件存放地址
	fs.exists(changeDirectory, function(exists) {
		if (exists) {
			// 已存在
			callbackFile(filepath, `${changeDirectory}/${copyName}`)
		} else {
			// 不存在
			fs.mkdir(changeDirectory, function() {
				callbackFile(filepath, `${changeDirectory}/${copyName}`)
			})
		}
	})
})