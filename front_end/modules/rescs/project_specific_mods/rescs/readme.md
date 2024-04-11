本库功能为创建一个资源展示框，主要展示图片和视频，并且本库还使用到了 Sortable.js 和 viewer.js这两个第三方库，已经本人开发的 mivd 库，所以在 html 中导入本库之前，必须先导入着三个库。
1. Sortable.js 用于给每个资源施加拖动排序的功能
2. viewer.js 用于给图片增加展览功能
3. mivd 用于给视频添加点击然后弹窗播放的功能

使用方式：调用 rescs.mjs 中的create_rescs，并传递一个 input 元素即可，这个 input 元素，设置属性 `multiple:true`、`type='file'`