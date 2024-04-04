import { Memo, request_ten_memos_json_arr_into_exhibit_area } from "./memo.js";
import { unsubmitted_memos } from "./post_queue.js";

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

    // 让滚动条到底部
    exhibit_area.scrollTop = exhibit_area.scrollHeight;

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
    let modify_memo_window = document.querySelector("div#modify_memo_window")
    if (modify_memo_window.style.display === 'block' && event.target.className !== "memo-modify-option") {
        if (event.target !== modify_memo_window && !modify_memo_window.contains(event.target)) {
            modify_memo_window.style.display = 'none';
        }
    }
});

// 每隔一秒通过滚动条检查列表是否需要获取更多 memo
let request_ten_memos_interval = setInterval(async function () {
    const scrollTop = exhibit_area.scrollTop
    const scrollHeight = exhibit_area.scrollHeight - exhibit_area.clientHeight
    const progress = (scrollTop / scrollHeight) * 100
    if (progress.toFixed(2) < -40) {
        // 一次性获取 10 条 memo
        if (await request_ten_memos_json_arr_into_exhibit_area() === false) {
            clearInterval(request_ten_memos_interval)
        }
    }
}, 1000);
