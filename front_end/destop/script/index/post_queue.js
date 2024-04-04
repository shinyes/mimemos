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

let del_memo_id = []
export function unuploaded_del_tasks() {

}
