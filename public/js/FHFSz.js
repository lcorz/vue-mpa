(function () {
  var creater = function () {
    var size = document.documentElement.style.fontSize.replace(/px/i, "")
    return function () {
      var realSize = getComputedStyle(window.document.documentElement)["font-size"].replace(/px/i, "")
      if (realSize !== size) {
        document.documentElement.style.fontSize = size / (realSize / size) + "px"
      }
    }
  }
  if (document.documentElement.style.fontSize === getComputedStyle(window.document.documentElement)["font-size"]) return
  var loop = creater()
  loop()
  var timer = setInterval(() => {
    loop()
  }, 100);
  setTimeout(() => {
    clearInterval(timer)
  }, 2000)
})()