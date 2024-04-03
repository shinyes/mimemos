import os
from flask import send_file, Blueprint, request, make_response, redirect, url_for, abort

from other_fn.sha256 import gen_sha256
from fn_abou_db.user_info import user_exists, select_psw_hash_by_name
from fn_abou_db.token import create_insert_token
from fn_abou_db.sign_up import create_user
import load_config

# 将视图函数放到不同的文件中时，就需要使用 Blueprint 了
root_bp = Blueprint("root", __name__)


@root_bp.route('/')
def get_login():
    return send_file(os.path.join(load_config.root_dir, 'front_end/destop/login.html'), as_attachment=False)


@root_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    if not user_exists(data['username']):
        return "账号不存在"
    elif gen_sha256(data['password']) == select_psw_hash_by_name(data['username']):
        response = make_response(redirect(url_for('index.index')))  # 视图函数 index 在 蓝图 index 中
        token = create_insert_token(data['username'])
        response.set_cookie('token', token, max_age=3600 * 24 * 30)
        return response
    else:
        return "密码不正确"


@root_bp.route('/signup', methods=['POST'])
def signup():
    data = request.json

    username = data['username']
    password = data['password']

    # 如果 请求体中 type 字段的值不是 signup，就返回 400
    if request.headers['type'] != 'signup':
        return abort(400)
    if username == '' or password == '':
        return '账号或密码不能为空'

    # 创建用户
    create_user(username, password)

    # 创建 token

    token = create_insert_token(username)

    response = make_response(redirect(url_for('index.index')))
    response.set_cookie('token', token, max_age=3600 * 24 * 30)
    return response
