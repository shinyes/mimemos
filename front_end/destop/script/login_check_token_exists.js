// 本脚本用于检查是否已经有 token，如果有，则直接跳转至 index 页面
const cookies = document.cookie.split(';')
let token_exists = false;
cookies.forEach(cookie => {
    const [name, _] = cookie.trim().split('=');
    if (name === 'token') {
        token_exists = true;
        // 退出循环
        return;
    }
});
if (token_exists) {
    window.location.href = '/index'
}
token_exists = null // 销毁变量
