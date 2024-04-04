import { update_memo_box_content } from "./memo_box.js"

// 这个变量用来存储打开 modify_memo_window 后想要修改的 memo_box 对象
let memo_box_to_be_modified;
// 由于 import 导入的变量被视作 const 变量，所以外部只能使用这个函数来修改变量 memo_box_to_be_modified
export function set_memo_box_to_be_modified(memo_box) {
    memo_box_to_be_modified = memo_box
}

let submit_modify_memo = document.querySelector('button#submit_modify_memo')
let modify_memo_textarea = document.querySelector('textarea#modify_memo_textarea')
let modify_memo_window = document.querySelector('div#modify_memo_window')

/* 提交 memo 修改按钮监听器，在此函数中会提交修改后的 memo text */
submit_modify_memo.addEventListener('click', () => {
    let new_text = modify_memo_textarea.value
    if (new_text == "") {
        return
    }
    // TODO 还需要想办法获取原本的 memo 的内容文本，并且在这里获取文本，然后赋值
    modify_memo_textarea.value = ''
    let memo_id = memo_box_to_be_modified.getAttribute('data-memo-id')
    modify_memo_window.style.display = 'none';

    // 前端修改 memo_box 显示的内容
    update_memo_box_content(memo_box_to_be_modified, new_text)

    // 提交修改后端记录的请求
    let data = {
        'memo_id': memo_id,
        'text': new_text,
        'updated_ts': Math.floor(new Date().getTime() / 1000),
    }

    fetch('/modify_memo_text', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json; charset=utf-8',
        })
    }).then(response => { })
        .catch(error => console.error('出现错误:', error));
});
