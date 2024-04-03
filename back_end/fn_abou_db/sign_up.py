import os
import sqlite3
import time
from other_fn.sha256 import gen_sha256
from fn_abou_db.user_info import select_user_id_by_name
import load_config


def create_user(username: str, password: bytes):
    # 首先在 user 中插入用户记录
    with sqlite3.connect(load_config.main_data_path) as conn:
        # 计算哈希值
        hv = gen_sha256(password)
        sql = 'INSERT INTO users VALUES(NULL,?,?,?)'
        conn.execute(sql, (username, hv, int(time.time())))
        conn.commit()

    user_id = select_user_id_by_name(username)

    # 创建新用户文件资源数据库
    with sqlite3.connect(os.path.join(load_config.database_file_path, "%s_resources.sl3" % user_id)) as conn:
        sql = '''
        CREATE TABLE resources
        (
            id              INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id         INT,
            upload_ts       INT,
            belong_to_memo  INT,
            type            TEXT,
            content         BLOB,
            len             INT
        );
        '''
        conn.execute(sql)
        conn.commit()
