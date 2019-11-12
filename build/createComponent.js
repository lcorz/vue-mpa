const fs = require('fs')
const path = require('path')

const COMPONENT_NAME = process.argv[2]

const templateString = fs.readFileSync(path.join(__dirname, './template/component.template'), 'utf-8')

const writeString = templateString.replace(/%NAME%/g, COMPONENT_NAME)

fs.writeFile('./src/components/' + COMPONENT_NAME + '.vue', writeString, (e) => {
  if (e) {
    console.warn(e)
  } else {
    console.log('创建成功')
  }
})
