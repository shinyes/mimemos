// 这个数组用于存放尚未提交的 memo
export let unsubmitted_memos = []

// 间隔 5s 执行检查和提交未上传的memo
async function upload_unsubmitted_memos() {
    setInterval(() => {
        if (unsubmitted_memos.length !== 0) {
            unsubmitted_memos[0].upload()
                .then(res => {
                    if (res === true) {
                        console.log("上传一个memo成功")
                        unsubmitted_memos.shift(); // 删除第一个元素
                    } else {
                        console.log("此次未上传成功")
                    }
                });
        }
    }, 5000);
}
upload_unsubmitted_memos()


import { delete_memo } from "./memo.js";
export let memo_id_arr_of_to_be_del = []

async function unuploaded_del_tasks() {
    setInterval(() => {
        if (memo_id_arr_of_to_be_del.length !== 0) {
            delete_memo(memo_id_arr_of_to_be_del[0]).
                then(res => {
                    if (res === true) {
                        console.log("删除一个memo成功")
                        memo_id_arr_of_to_be_del.shift(); // 删除第一个元素
                    } else {
                        console.log("此次未删除成功")
                    }
                })
        }
    }, 5000);
}
unuploaded_del_tasks()