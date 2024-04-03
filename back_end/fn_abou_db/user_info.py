import os
import sqlite3
import load_config


def select_user_id_by_name(username: str):
    with sqlite3.connect(load_config.main_data_path) as conn:
        cur = conn.cursor()
        sql = 'SELECT id FROM users where username=?'
        cur.execute(sql, (username, ))
        user_id = cur.fetchone()[0]  # 读取到的字段会存储在元组中，不论有几个字段
        return user_id


def user_exists(username: str):
    with sqlite3.connect(load_config.main_data_path) as conn:
        cur = conn.cursor()
        sql = 'SELECT id FROM users where username=?'
        cur.execute(sql, (username, ))
        l = cur.fetchall()
        if len(l) == 0:
            return False
        else:
            return True


def select_psw_hash_by_name(username: str):
    with sqlite3.connect(load_config.main_data_path) as conn:
        cur = conn.cursor()
        sql = 'SELECT psw_hash FROM users where username=?'
        cur.execute(sql, (username, ))
        psw_hash = cur.fetchone()[0]  # 读取到的字段会存储在元组中，不论有几个字段
        return psw_hash


def select_user_id_by_token(token: str):
    with sqlite3.connect(load_config.main_data_path) as conn:
        cur = conn.cursor()
        sql = 'SELECT user_id FROM tokens where token=?'
        cur.execute(sql, (token, ))
        user_id = cur.fetchone()[0]  # 读取到的字段会存储在元组中，不论有几个字段
        return user_id
