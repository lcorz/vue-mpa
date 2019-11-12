### 使用说明

### 2019.11.12
修改了页面中img文件夹打包机制 现在可以在页面中直接引入图片然后将所有文件转出即可 不用将图片单独上传cdn

### 2019.4.18

想改下打包 但是比较蛋疼 vue-cli3 多页面打包修改filename html的位置虽然改了 但是他不会修改自己本身引用的文件路径 然后呢 也没给个方法说能让js和css挪到里面来 如果通过修改output 又会导致 js css 挪过来了 html中引用的资源路径对不上  尝试多次无果...最后使用文件挪移大法... build/copyFile

现在来说就不用吧css js 一起打包进html这种很麻烦的方式了 直接文件夹拖走就行了

#### 2019.3.30

因为某些特殊原因导致页面轻轻松松过1M的情况 做出如下修改

修改打包逻辑 因为一些不可抗力,这个项目纯单页面(css,js也被打包进html中) 对页面体积要求较高 所以进行拆分打包splitChunks

以及cdn优化 添加externals

页面增加config.js 可配置title以及页面所需cdn 配置方法如下 多个资源拼接字符串即可

```
module.exports = {
  title:'video',
  cdn:{
    css:`<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/video.js@7.4.1/dist/video-js.min.css">`,
    js:`<script src="//cdn.jsdelivr.net/npm/video.js@7.4.1/dist/video.min.js"></script>`
  }
}
```

#### 2019.1.x

此工具基于vue-cli 3

新建页面时在pages中 新建对应名称的页面内部包含 `index.vue` 以及 `main.js` 文件

项目使用less 支持px转rem 所以在编写项目时直接按照设计稿写对应px值即可 如需直接使用px 请大写`PX`

public中引入`FHFSz.js`用来解决安卓在用户自行修改系统字体导致的webview字体缩放的问题

