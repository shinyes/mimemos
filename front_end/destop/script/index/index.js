import { Memo, request_ten_memos_json_arr_into_exhibit_area } from "./memo.js";
import { unsubmitted_memos } from "./post_queue.js";
import { create_rescs } from "../drag_and_viewer_and_mivd/css_js/rescs.mjs"

// 运行 polling.js 脚本
import { } from "./polling.js"

// 进入页面后立即请求 10 条 memo
request_ten_memos_json_arr_into_exhibit_area()

let btn_signout = document.querySelector("button.signout")

// 点击「登出」按钮时删除 cookie，并跳转至 host
btn_signout.addEventListener("click", () => {
    // 清空 cookie
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    window.location.href = '/'
});


let btn_submit_memo = document.querySelector("button.submit-memo")
let exhibit_area = document.querySelector("div.exhibit-area")
let textarea_input_memo = document.querySelector("textarea.input-memo")

// 点击「提交」
btn_submit_memo.addEventListener('click', async () => {
    let text = textarea_input_memo.value
    if (text === '') {
        return
    }
    textarea_input_memo.value = ""

    let memo = new Memo(0, text)
    let memo_box = memo.gen_memo_box()
    exhibit_area.prepend(memo_box);

    // 如果上传不成功，则将这个元素添加至「unsubmitted_memos」中
    let res = await memo.upload();
    if (res === false) {
        console.log("没有上传成功，等待上传")
        unsubmitted_memos.push(memo);
    }
});


// 输入时按下回车 shift + enter 就提交 memos
textarea_input_memo.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && !event.shiftKey) {
        var start = textarea_input_memo.selectionStart;
        var end = textarea_input_memo.selectionEnd;
        var value = textarea_input_memo.value;
        textarea_input_memo.value = value.substring(0, start) + "\n" + value.substring(end);
        textarea_input_memo.selectionStart = textarea_input_memo.selectionEnd = start + 1;

    } else if (event.key === "Enter" && event.shiftKey) {
        event.preventDefault(); // 阻止回车键的默认行为（换行）
        btn_submit_memo.click(); // 模拟点击按钮
    }
});

/* 如果点击鼠标，且被点击的对象不在修改窗口内，则关闭修改窗口 */
document.addEventListener('click', function (event) {
    let modify_memo_window = document.querySelector("div#modify-memo-window")
    if (modify_memo_window.style.display === 'block' && event.target.className !== "memo-modify-option") {
        if (event.target !== modify_memo_window && !modify_memo_window.contains(event.target)) {
            modify_memo_window.style.display = 'none';
        }
    }
});

let rescs = create_rescs(document.querySelector('#upload-resc'))
let input_container = document.querySelector('.input-container')
let input_tools = document.querySelector('.input-tools')
input_container.insertBefore(rescs, input_tools)