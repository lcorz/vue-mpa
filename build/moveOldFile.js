const fs = require("fs")
const path = require("path")

function moveFile(startPath, endPath) {
  const now = new Date().getTime()
  let files = fs.readdirSync(startPath)
  files.forEach(val => {
    let fPath = path.join(startPath, val)
    let stats = fs.statSync(fPath)
    if (!stats.isDirectory())
      return
    let subFiles = fs.readdirSync(fPath)
    const needMove = subFiles.every(val => {
      let subPath = path.join(fPath, val)
      let subStats = fs.statSync(subPath)
      let subFileMtime = new Date(subStats.mtime).getTime()
      return (now - subFileMtime > 864000000 )  // 10天 之后觉得打包太卡可以往下再减减
    })
    if (needMove && val !== 'index') {
      let movePath = path.join(endPath, val)
      try {
        fs.renameSync(fPath, movePath, function () {})
      } catch (error) {
        console.log(`----------------------------------------------------------------------------------------------------------------------------
        > 因${val}项目长时间未修改并且在bak文件夹中已存在目录, 请确认新代码是否可以将旧代码覆盖, 并进行手动处理后重新执行指令 <
----------------------------------------------------------------------------------------------------------------------------
        `)
        process.exitCode = 1;
      }
    }
  })
}
moveFile("./src/pages", "./src/pages.bak")
