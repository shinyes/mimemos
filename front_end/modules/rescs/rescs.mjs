import { create_resc } from "./resc.mjs"
import Sortable from "../sortable.complete.esm.js"
import { recreate_miviewer_container } from "../miviewer/miviewer.mjs"
import { query_ancestor_by_class_name } from "../base_modules/query_ancestor.js"

const currentScriptUrl = import.meta.url;
const curr_script_path = new URL(currentScriptUrl).pathname;
const curr_script_dir_path = curr_script_path.substring(0, curr_script_path.lastIndexOf('/'));

export function create_rescs(file_input) {
    let rescs = document.createElement('div')
    rescs.style.display = 'none' // 先隐藏
    rescs.classList.add('rescs')
    rescs.classList.add('sortable-list')

    // 这个div块用于点击后上传文件
    let plus_resc = document.createElement('div')
    plus_resc.classList.add('plus-resc')
    plus_resc.classList.add('no-drag') // 避免被 sortable.js 库排序
    rescs.appendChild(plus_resc)

    // 加号图标
    let plus_img = document.createElement('img')
    plus_resc.appendChild(plus_img)
    plus_img.classList.add('viewer-ignore')

    plus_img.src = curr_script_dir_path + '/' + './assets/plus.svg'

    /*
    点击 upload_btn 后弹窗示意上传文件
    */
    plus_resc.addEventListener('click', function () {
        file_input.click();
    });

    listen_input_then_create(rescs, plus_resc, file_input)

    /* 
    这段代码用于控制 rescs 块只有在其中有 resc 时才显示
    */
    var observer = new MutationObserver(function (mutationsList, observer) {
        // 检查容器中是否有 resc 元素，没有就隐藏
        if (rescs.childElementCount === 1) {
            // 没有子元素，隐藏容器
            rescs.style.display = 'none'
        } else if (rescs.childElementCount > 1) {
            // 有子元素，显示容器
            rescs.style.display = 'grid'
        }
    });

    // 配置观察器以监视子节点的添加和删除
    var config = { childList: true };

    // 将观察器绑定到容器元素，并开始观察
    observer.observe(rescs, config);

    /* 为 rescs 施加 Sortable 效果 */
    new Sortable(rescs, {
        animation: 150, // 动画时长（以毫秒为单位）

        /* 用于禁止属于 `no-drag 类的元素被拖动` */
        filter: '.no-drag',
        /* 禁止其他元素拖动到 no-drag 后方 */
        onMove: function (evt) {
            // 如果被拖动的元素具有类名 'no-drag'，或者被拖动到列表的最后一个位置之前，则阻止移动
            if (evt.related.classList.contains('no-drag')) {
                return false;
            }
        }
    });

    rescs.classList.add('miviewer-container')

    return rescs
}

/* 
上传文件后创建 resc，并返回之
*/
function listen_input_then_create(rescs, plus_resc, file_input) {
    file_input.addEventListener('change', function (event) {
        const files = event.target.files

        for (let i = 0; i < files.length; i++) {
            let file = files[i]
            const reader = new FileReader();

            // 绑定事件监听：当读取完成一个文件之后就创建 resc 元素
            reader.onload = function (event2) {
                const fileType = file.type.split('/')[0]; // 获取文件类型
                let resc = create_resc(fileType, event2.target.result)
                rescs.insertBefore(resc, plus_resc)

                /* 只给 miviewer-item 添加点击就打开 miviewer 的监听器 */
                if (resc.firstElementChild.classList.contains('miviewer-item')) {
                    resc.addEventListener('click', e => {
                        recreate_miviewer_container(resc.firstElementChild)
                    })
                }
            };

            // 开始读取文件
            reader.readAsDataURL(file);
        }
        file_input.value = ''
    });
}

/* 
判断 rescs 中有没有元素，如果有则显示，否则不显示
*/
function check_rescs_content(event) {
    if (event.target.children.length === 0) {
        event.target.style.display = 'none'
    } else {
        event.target.style.display = 'block'
    }
}