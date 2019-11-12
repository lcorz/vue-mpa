let ua = navigator.userAgent.toLowerCase()
let iosFlag = false
let androidFlag = false
let wxFlag = false
let qqFlag = false
if (/iphone|ipad|ipod|ios/.test(ua)) {
	iosFlag = true
} else if (/android/.test(ua)) {
	androidFlag = true
}
if (/MicroMessenger/i.test(ua)) {
	wxFlag = true
}
// 不好使
if (/Mqqbrowser/i.test(ua)) {
	qqFlag = true
}
export default {
	ios: iosFlag,
	android: androidFlag,
	wx: wxFlag,
	qq: qqFlag
}
