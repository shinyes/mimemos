import { unsubmitted_memos } from "../scripts/index/post_queue.js";
import { Memo } from "../scripts/index/memo.js";
import { create_rescs } from "../../modules/rescs/rescs.mjs"

// 获取登出按钮
let btn_signout = document.querySelector("button.signout")
// 获取提交按钮
let btn_submit_memo = document.querySelector("button.submit-memo")
// 获取 memo 的展示区域
let exhibit_area = document.querySelector("div.exhibit-area")
// 获取输入 memo 的文本输入框
let textarea_input_memo = document.querySelector("textarea.input-memo")


// 点击「登出」按钮时删除 cookie，并跳转至 host
btn_signout.addEventListener("click", () => {
    // 清空 cookie
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    window.location.href = '/'
});


// 监听点击提交memo的按钮
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


// 监听在输入memo的文本时，如果按下回车 shift + enter，就提交 memos
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


// 监听：在打开memo修改窗口时，如果点击窗口外，就关闭memo修改窗口
document.addEventListener('click', function (event) {
    let modify_memo_window = document.querySelector("div#modify-memo-window")
    if (modify_memo_window.style.display === 'block' && event.target.className !== "memo-modify-option") {
        if (event.target !== modify_memo_window && !modify_memo_window.contains(event.target)) {
            modify_memo_window.style.display = 'none';
        }
    }
});


// 监听点击上传memo的附属文件时，浏览器请求上传文件
let input_file = document.querySelector('input#input-file')
let upload_resc = document.querySelector('#upload-resc')
let is_rescs_exists;
upload_resc.addEventListener('click', () => {
    input_file.click()
    if (!is_rescs_exists) {
        let input_tools = document.querySelector('div.input-tools')
        let input_container = document.querySelector('div.input-container')
        input_container.insertBefore(create_rescs(input_file), input_tools)
        is_rescs_exists = true;
    }
})