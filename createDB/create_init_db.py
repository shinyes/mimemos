# 本脚本用于创建最基本的数据库

import os
import sqlite3

curr_dir = os.path.dirname(os.path.abspath(__file__))

with sqlite3.connect(os.path.join(curr_dir, "../back_end/db/main_data.sl3")) as conn:

    # 创建用户表
    sql = '''
    CREATE TABLE users
    (
        id          INTEGER PRIMARY KEY AUTOINCREMENT,
        username    TEXT UNIQUE,
        psw_hash    TEXT,
        sign_up_ts  INT
    );
    '''
    conn.execute(sql)

    # 创建token表
    sql = '''
    CREATE TABLE tokens
    (
        id          INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id     INT,
        token       TEXT,
        create_ts   INT,
        expires     INT
    )
    '''
    conn.execute(sql)

    # 创建 memo 表
    sql = '''
    CREATE TABLE memos
    (
        id                  INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id             INT,
        created_ts          INT,
        updated_ts          INT,
        text                TEXT,
        resource_id_queue   TEXT
    )
    '''
    conn.execute(sql)
    conn.commit()
