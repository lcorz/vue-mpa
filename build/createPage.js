const fs = require('fs')
const path = require('path')

const PAGE_NAME = process.argv[2]

const templateString = fs.readFileSync(path.join(__dirname, './template/component.template'), 'utf-8')
const mainString = fs.readFileSync(path.join(__dirname, './template/main.template'), 'utf-8')
const configString = fs.readFileSync(path.join(__dirname, './template/config.template'), 'utf-8')

const writeString = templateString.replace(/%NAME%/g, PAGE_NAME)

fs.mkdirSync('./src/pages/' + PAGE_NAME)

fs.mkdirSync('./src/pages/' + PAGE_NAME + '/img')

fs.writeFileSync('./src/pages/' + PAGE_NAME + '/index.vue', writeString, (e) => {
  if (e) {
    return console.warn(e)
  }
})

fs.writeFileSync('./src/pages/' + PAGE_NAME + '/config.js', configString, (e) => {
  if (e) {
    return console.warn(e)
  }
})

fs.writeFileSync('./src/pages/' + PAGE_NAME + '/main.js', mainString, (e) => {
  if (e) {
    return console.warn(e)
  }
})
console.log('页面创建成功！')
