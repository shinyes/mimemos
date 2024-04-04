import {
    gen_memo_box
} from "./memo_box.js"

class resource {
    constructor(user_id, upload_ts, belong_to_memo, type, content) {
        this.user_id = user_id;
        this.upload_ts = upload_ts;
        this.belong_to_memo = belong_to_memo;
        this.type = type;
        this.content = content
        this.len = content.size
    }
}

export class Memo {
    constructor(memo_id, text, created_ts = Math.floor(new Date().getTime() / 1000), updated_ts = created_ts) {
        this.memo_id = memo_id
        this.text = text;
        // 生成当前时间戳
        this.created_ts = created_ts;
        this.updated_ts = updated_ts;
    }

    /* 用于上传好 memo 之后返回 memo_id，然后设置对应的 memo-box 的属性 */
    set_memo_id(memo_id) {
        this.memo_id = memo_id
        this.memo_box.setAttribute("data-memo-id", this.memo_id);
    }

    gen_memo_box() {
        this.memo_box = gen_memo_box(this.text, this.created_ts, this.memo_id)
        return this.memo_box
    }


    /* 上传 memo */
    async upload() {
        let data = {
            'created_ts': this.created_ts,
            'updated_ts': this.updated_ts,
            'text': this.text,
        };
        let flag = false;

        await fetch('/submit_memo', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json; charset=utf-8',
                'type': 'submit_memo',
            })
        }).then(response => {
            if (response.status === 200) {
                console.log("一条memo上传成功")
                flag = true
            }
            return response.json()
        }).then(data => {
            this.set_memo_id(data['memo_id'])
        }).catch(error => {
            console.error('出现错误:', error)
            flag = false
        });
        return flag
    }
}

import { memo_id_arr_of_to_be_del } from "./post_queue.js";
export async function delete_memo(memo_id) {
    /* 
    通过 memo 的 id 发送报文到服务端请求删除 memo
    */
    let data = { 'memo_id': Number(memo_id) };
    return await fetch('/delete_memo', {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json; charset=utf-8',
        }),
        body: JSON.stringify(data),
    }).then(response => {
        if (response.status === 200) {
            console.log('删除memo成功, 被删除的的memo的id为', memo_id)
            return true
        } else if (response.status === 210) {
            console.log('删除memo失败, 没有 id 为', memo_id, '的 memo')
            return false
        }
    }).catch(error => {
        console.error('出现错误:', error)
        return false
    })
}

// 从服务器请求 10 条 memo
let exhibit_area = document.querySelector("div.exhibit-area")
let oldest_memo_ts;
export async function request_ten_memos_json_arr_into_exhibit_area() {
    let data;
    if (oldest_memo_ts === undefined) {
        // 加载时间戳小于现在的 10 条 memo
        data = { "ts": Math.floor(new Date().getTime() / 1000) }
    } else {
        // 加载时间戳小于 oldest_memo 的前十条 memo
        data = { "ts": oldest_memo_ts }
    }

    let res = true;
    await fetch('/request_ten_memos_json_arr', {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json; charset=utf-8',
        }),
        body: JSON.stringify(data),
    }).then(response => {
        if (response.status === 200) {
            // response 返回的是一个 promise 对象，是异步操作，所以可以继续使用 then 来等待异步操作
            // 但是也可以用 await 来等待 resonse.json() 的结果
            return response.json()
        }
    }).then(memos_json_arr => {
        if (memos_json_arr.length === 0) {
            res = false
        } else {
            oldest_memo_ts = memos_json_arr[memos_json_arr.length - 1].created_ts
            for (const e of memos_json_arr) {
                let memo_box = new Memo(e.memo_id, e.text, e.created_ts, e.updated_ts).gen_memo_box();
                exhibit_area.append(memo_box);
            }
        }
    });
    return res
}
