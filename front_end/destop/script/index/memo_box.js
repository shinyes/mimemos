import { delete_memo } from "./memo.js";
import { set_memo_box_to_be_modified } from "./modify_memo.js"

/* 
这个函数用于生成 memo-box 元素的模板，
当然，随着项目允许的 memo 的内容更加丰富，这个函数也肯定需要更改
*/
function gen_memo_box_tmpl() {
    let memo_box = document.createElement('div');
    memo_box.className = "memo-box";

    let memo_info = document.createElement('div')
    memo_info.className = 'memo-info'
    memo_box.appendChild(memo_info)

    // memo-time 和 memo-option-menu 是 memo-info 的一部分
    let memo_time = document.createElement('div')
    memo_time.className = 'memo-time'
    memo_info.appendChild(memo_time)

    let memo_option_menu = document.createElement('div')
    memo_option_menu.className = 'memo-option-menu'
    memo_info.appendChild(memo_option_menu)

    let memo_option_menu_text = document.createElement('span')
    memo_option_menu_text.textContent = '•••'
    memo_option_menu.appendChild(memo_option_menu_text)


    let memo_options = document.createElement('div')
    memo_options.className = 'options'
    memo_option_menu.appendChild(memo_options)

    let memo_edit_option = document.createElement('div')
    memo_edit_option.className = 'memo-modify-option'
    memo_edit_option.textContent = '编辑'
    memo_options.appendChild(memo_edit_option)

    let memo_del_option = document.createElement('div')
    memo_del_option.className = 'memo-del-option'
    memo_del_option.textContent = '删除'
    memo_options.appendChild(memo_del_option)


    // memo-box 的主要内容
    let p = document.createElement('p');
    p.className = 'content'
    memo_box.appendChild(p)
    return memo_box
}

// memo-box 的模板
let memo_box_tmpl = gen_memo_box_tmpl()

function add_del_memo_listener(memo_box) {
    let memo_del_option = memo_box.querySelector('div.memo-del-option')
    memo_del_option.addEventListener('click', () => {
        let memo_box = memo_del_option.parentNode.parentNode.parentNode.parentNode
        let memo_id = memo_box.getAttribute('data-memo-id')
        delete_memo(memo_id)
        memo_box.parentNode.removeChild(memo_box)
    })
}

/* 为给定的 memo box 元素添加监听点击编辑 memo 的执行函数 */
function add_modify_memo_listener(memo_box) {
    let memo_modify_option = memo_box.querySelector("div.memo-modify-option")
    memo_modify_option.addEventListener('click', () => {
        let modify_memo = document.querySelector('div#modify_memo_window')
        modify_memo.style.display = 'block'
        set_memo_box_to_be_modified(memo_box)
    })
}

/* 如果点击鼠标，且被点击的对象不在修改窗口内，则关闭修改窗口 */
document.addEventListener('click', function (event) {
    let modify_memo_window = document.querySelector("div#modify_memo_window")
    if (modify_memo_window.style.display === 'block' && event.target.className !== "memo-modify-option") {
        if (event.target !== modify_memo_window && !modify_memo_window.contains(event.target)) {
            modify_memo_window.style.display = 'none';
        }
    }
});

export function gen_memo_box(content, created_ts, memo_id) {
    let new_memo_box = memo_box_tmpl.cloneNode(true) // true 表示复制整个元素，包括其子元素
    add_del_memo_listener(new_memo_box)
    add_modify_memo_listener(new_memo_box)

    let content_p = new_memo_box.querySelector("p.content")
    content_p.textContent = content;

    // 将 created_ts转换为日期，这个时间戳来自于python 所以单位是秒
    // 而js的时间戳是毫秒，所以要先乘 1000
    let date = new Date(created_ts * 1000);
    let formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
    let memo_time = new_memo_box.querySelector("div.memo-time")
    memo_time.textContent = formattedDate

    new_memo_box.setAttribute("data-memo-id", memo_id);
    return new_memo_box
}

export function gen_memo_box_content(text) {
    let content = document.createElement('p');
    content.className = 'content'
    content.textContent = text
    return content
}

export function update_memo_box_content(memo_box, text) {
    let content = memo_box.querySelector('.content')
    memo_box.removeChild(content)
    memo_box.appendChild(gen_memo_box_content(text))
}