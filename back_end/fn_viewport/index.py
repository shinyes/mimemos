from flask import request, send_file, redirect, make_response, Blueprint, jsonify
from fn_abou_db.token import token_is_ok
from fn_abou_db.memo import insert_memo, select_ten_memo_after_ts_and_gen_json, delete_memo_by_id, update_memo_text

index_bp = Blueprint("index", __name__)


@index_bp.route('/index')
def index():
    '''
    如果用户 token 有效，则发送 index 页面，否则删除 cookie 中的无效 toekn，并跳转至 /
    '''
    if token_is_ok(request.cookies['token']):
        return send_file('../front_end/destop/index.html', as_attachment=False)
    else:
        # 跳转至 host 不能用 url_for 函数
        response = make_response(redirect('/'))
        # 删除 cookie 中的字段
        response.set_cookie('token', '', expires=0)
        return response


@index_bp.route('/submit_memo', methods=['POST'])
def submit_memo():
    token = request.cookies['token']
    if token_is_ok(token):
        inserted_id = insert_memo(token, request.json)
        response = make_response(jsonify({"memo_id": inserted_id}))
        response.status_code = 200
        return response


@index_bp.route('/request_ten_memos_json_arr', methods=['POST'])
def request_ten_memo_after_ts_and_gen_json():
    '''
    接受浏览器请求获取十个给定时间戳之后的前10条数据
    '''
    token = request.cookies['token']
    data = request.json  # 将 POST 请求体中的数据转换为字典
    if token_is_ok(token):
        ts = data['ts']
        return jsonify(select_ten_memo_after_ts_and_gen_json(token, ts))


@index_bp.route('/delete_memo', methods=['POST'])
def delete_memo():
    '''
    删除 memo, 返回状态码 200 代表正常删除, 否则代表没有这个memo
    '''
    token = request.cookies['token']
    data = request.json  # 将 POST 请求体中的数据转换为字典
    if token_is_ok(token):
        memo_id = data['memo_id']
        return ('memo删除成功'.encode('utf-8'), 200) if delete_memo_by_id(memo_id) else ("memo删除失败", 210)


@index_bp.route('/modify_memo_text', methods=['POST'])
def modify_memo_text():
    '''
    修改 memo 的 text 字段
    '''
    token = request.cookies['token']
    data = request.json  # 将 POST 请求体中的数据转换为字典
    if token_is_ok(token):
        memo_id = data['memo_id']
        text = data['text']
        updated_ts = data['updated_ts']
        update_memo_text(memo_id, text, updated_ts)
        return ('修改成功', 200)
