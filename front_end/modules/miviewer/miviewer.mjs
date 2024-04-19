import { getAllDescendants } from "./base_mods/access_node.mjs"
import { query_ancestor_by_class_name } from "./base_mods/query_ancestor.js";
import { miviewer_container, browsing_progress, close_miviewer_btn, showcase, angle_left, angle_right } from "./miviewer_container.js";


export async function recreate_miviewer_container(element, options = { filter: null, item_class_name: 'miviewer-item', container_class_name: 'miviewer-container' }) {
    let container = query_ancestor_by_class_name(element, options.container_class_name)
    let arr_of_miviewer_item = getAllDescendants(container, e => {
        // 如果元素的类名包含 miviewer_item_class_name，并且 filter!==null 时，继续用 filter 去筛选
        if (!e.classList.contains(options.item_class_name)) {
            return false
        }
        if (options.filter === null) {
            return true
        } else {
            return options.filter(e)
        }
    })
    set_browsing_progress(arr_of_miviewer_item.indexOf(element) + 1, arr_of_miviewer_item.length)
    pop_up_miviewer_container(element, arr_of_miviewer_item, options)
}

export async function create_miviewer_container(conainter, options = { filter: null }) {
    // 获取 container 的所有类名含有的子孙元素，并存储到 arr_of_miviewer_item 中
    let arr_of_miviewer_item = getAllDescendants(conainter, options.filter)

    // 为每一个元素添加事件监听器，这个事件监听器的功能是点击后就打开 miviewer_player，并且 miviewer_player 中就会展览 arr_of_miviewer_item 中的所有图片或视频
    arr_of_miviewer_item.forEach(miviewer_item => {
        // 这个监听器是一个闭包，会把 miviewer_item 保留下来，就算 empower_miviewer 结束运行
        miviewer_item.addEventListener('click', event => {
            // 打开 miviewer_container
            pop_up_miviewer_container(event.target, arr_of_miviewer_item, options)
        })
    });
}

/* 
展览 arr_of_miviewer_item 中的图片或视频
*/
function pop_up_miviewer_container(target, arr_of_miviewer_item, options = {}) {
    arr_of_miviewer_item.forEach(item => {
        // 复制一份新的节点，方便展示
        let t = item.cloneNode(true)
        // 点击的那个图片/视频显示，其他的不显示
        if (item !== target) {
            t.style.display = 'none'
        }
        // 打开视频元素的控件
        if (t instanceof HTMLVideoElement) {
            item.pause()
            t.controls = true
        }
        showcase.appendChild(t)
    });
    document.body.appendChild(miviewer_container)
    miviewer_container.style.display = 'block'
}

/* 
关闭 miviewer
*/
function close_miviewer() {
    // 清空 showcase
    showcase.innerHTML = ''
    document.body.removeChild(miviewer_container)
}

/* 
实现在弹出 miviewer_container 时，按下 ESC 键就关闭弹出的界面
*/
document.addEventListener('keydown', event => {
    if (event.key === "Escape" && miviewer_container.style.display == 'block') {
        close_miviewer()
    }
});

/*
实现按下 close_miviewer_btn 时，关闭 miviewer_container
*/
close_miviewer_btn.addEventListener('click', event => {
    close_miviewer()
})

/*
返回当前正在展示的资源
*/
function get_current_show_resc() {
    let rescs = showcase.children
    for (let index = 0; index < rescs.length; index++) {
        const element = rescs[index];
        if (element.style.display !== 'none') {
            return element
        }
    }
}

/* 当点击左箭头时，如果前面还有资源，就显示前面一个资源 */
angle_left.addEventListener('click', event => {
    let curr_show_resc = get_current_show_resc()
    let previousElementSibling = curr_show_resc.previousElementSibling
    if (previousElementSibling !== null) {
        curr_show_resc.style.display = 'none'
        previousElementSibling.style.display = 'block'
        browsing_progress_reduced_by_1()
    }
})

/* 当点击右箭头时，如果后面还有资源，就显示后面一个资源 */
angle_right.addEventListener('click', event => {
    let curr_show_resc = get_current_show_resc()
    let nextElementSibling = curr_show_resc.nextElementSibling
    if (nextElementSibling !== null) {
        curr_show_resc.style.display = 'none'
        nextElementSibling.style.display = 'block'
        browsing_progress_increased_by_1()
    }
})

/* 用于显示浏览进度 */
function set_browsing_progress(curr_progress, totality) {
    browsing_progress.textContent = curr_progress.toString() + '/' + totality.toString()
}
function browsing_progress_increased_by_1() {
    let text = browsing_progress.textContent
    let index_of_slash = text.indexOf('/')
    let previous_progress = parseInt(text.substring(0, index_of_slash))
    browsing_progress.textContent = (previous_progress + 1).toString() + text.substring(index_of_slash)
}
function browsing_progress_reduced_by_1() {
    let text = browsing_progress.textContent
    let index_of_slash = text.indexOf('/')
    let previous_progress = parseInt(text.substring(0, index_of_slash))
    browsing_progress.textContent = (previous_progress - 1).toString() + text.substring(index_of_slash)
}