# miviewer 项目解释

## 使用方法
使用方法，以模组的方式引入脚本中的empower_miviewer函数，然后传递一个容器，然后本模组就会给这个容器里的所有图片或视频资源都施加效果——点击就会打开一个展示界面。

这个库通过 create_miviewer_container 函数和 recreate_miviewer_container 函数进行使用，


create_miviewer_container 还可以接受第二个参数，这个参数是 JSON 对象，其中可以给定 filter 属性，其值必须为一个函数，此函数接受一个参数，并返回 true 或 false的函数，该函数用于过滤不想要被加入到 miviewer 中的 img 或 video 元素资源。


recreate_miviewer_container 相比第一个函数更加灵活，由于 create_miviewer_container 会在调用的一瞬间就把 miviewer_container 创建好，之后容器内的元素就无法改变，所以可以使用第二个函数，可以把第二个函数放到存放图片/视频资源的容器之中的某个元素的事件监听器中，比如就放到容器中的某个图片的元素的单击的事件监听器中，那么只要点击这个图片，就会立即往上搜索类名包含 miviewer-container 的元素，并将其作为存放图片/视频的容器，然后再搜索这个容器中的所有类名包含 miviewer-item 的 img 或 video 元素，然后就会打开 miviewer_container