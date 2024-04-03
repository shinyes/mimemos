import time
from other_fn.sha256 import gen_sha256
from fn_abou_db.user_info import select_user_id_by_name
import sqlite3
import load_config


def create_insert_token(username: str, expires: int = 2592000):
    token = gen_sha256(username + str(time.time()))
    with sqlite3.connect(load_config.main_data_path) as conn:
        sql = 'INSERT INTO tokens VALUES(NULL,?,?,?,?)'
        conn.execute(sql, (select_user_id_by_name(username), token, int(time.time()), expires))
        conn.commit()
    return token


def token_is_ok(token: str):
    '''
    如果 token 不存在或过期, 就会返回 False, 否则返回 True
    '''
    with sqlite3.connect(load_config.main_data_path) as conn:
        cur = conn.cursor()
        sql = 'SELECT create_ts,expires FROM tokens WHERE token=?'
        cur.execute(sql, (token, ))
        token = cur.fetchall()
        # 如果 token 不存在
        if len(token) == 0:
            return False
        # 如果 token 过期
        elif int(time.time()) - token[0][0] > token[0][1]:
            return False
        else:
            return True
