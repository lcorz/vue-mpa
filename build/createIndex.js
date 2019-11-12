const fs = require("fs")
const path = require("path")

function findSync(startPath) {
	let result = []
	function finder(_path) {
		let files = fs.readdirSync(_path)
		files.forEach(val => {
			let fPath = path.join(_path, val)
			let stats = fs.statSync(fPath)
			if (stats.isDirectory()) finder(fPath)
			if (stats.isFile()) {
				if (val === "main.js") {
					const pageName = path.dirname(fPath).split("/").reverse()[0]
					result.push(pageName)
				}
			}
		})
	}
	finder(startPath)
	return result
}
const pages = findSync("./src/pages")

pages.splice(pages.findIndex(item => item === 'index'), 1)
let list = JSON.stringify(pages)
const template = fs.readFileSync(path.join(__dirname, "./template/index.vue"), "UTF-8")
const text = template.replace(/%LIST%/g, list)
const dir = path.join(__dirname, "../src/pages/index")
fs.writeFileSync(path.join(dir, "index.vue"), text, "UTF-8")
