/* 
这个函数用于生成 memo-box 元素的模板，
当然，随着项目允许的 memo 的内容更加丰富，这个函数也肯定需要更改
*/
export function gen_memo_box_tmpl() {
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
export let memo_box_tmpl = gen_memo_box_tmpl()