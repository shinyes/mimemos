import { request_ten_memos_json_arr_into_exhibit_area } from "./memo.js";

let exhibit_area = document.querySelector("div.exhibit-area")
// 每隔一秒通过滚动条检查列表是否需要获取更多 memo
let request_ten_memos_interval = setInterval(async function () {
    const scrollTop = exhibit_area.scrollTop
    const scrollHeight = exhibit_area.scrollHeight - exhibit_area.clientHeight
    const progress = (scrollTop / scrollHeight) * 100
    // if (progress.toFixed(2) < -40) {
    if (progress.toFixed(2) > 40) {
        // 一次性获取 10 条 memo
        if (await request_ten_memos_json_arr_into_exhibit_area() === false) {
            clearInterval(request_ten_memos_interval)
        }
    }
}, 1000);