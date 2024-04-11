input_username = document.querySelector('input.username')
input_password = document.querySelector('input.password')
btn_login = document.querySelector('button.login')
btn_signup = document.querySelector('button.signup')

/* 
监听点击登录按钮
*/
btn_login.addEventListener('click', () => {
    var data = {
        'username': input_username.value,
        'password': input_password.value
    }

    fetch('/login', {
        method: 'POST',
        redirect: 'follow', // 设置重定向选项为 follow
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json; charset=utf-8',
            'type': 'login',
        })
    }).then(response => {
        if (response.redirected) {
            // 如果发生了重定向，跳转到重定向的URL
            window.location.href = response.url;
        } else {
            // 处理其他情况
            console.log('No redirect occurred');
        }
    }).catch(error => console.error('Error:', error));
});

/* 
监听点击注册按钮
*/
btn_signup.addEventListener('click', () => {
    var data = {
        'username': input_username.value,
        'password': input_password.value
    }

    fetch('/signup', {
        method: 'POST',
        redirect: 'follow', // 设置重定向选项为 follow
        headers: new Headers({
            'Content-Type': 'application/json; charset=utf-8',
            'type': 'signup',
        }),
        body: JSON.stringify(data)
    }).then(response => {
        if (response.redirected) {
            // 如果发生了重定向，跳转到重定向的URL
            window.location.href = response.url;
        } else {
            // 处理其他情况
            console.log('No redirect occurred');
        }
    }).catch(error => console.error('Error:', error));
})