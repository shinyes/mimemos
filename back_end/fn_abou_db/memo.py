import sqlite3
import load_config

from fn_abou_db.user_info import select_user_id_by_token


def insert_memo(token, memojson):
    '''
    接受一个 token，和 memo 的 json 数据，然后新建一个 memo
    '''
    user_id = select_user_id_by_token(token)
    created_ts = memojson['created_ts']
    updated_ts = memojson['updated_ts']
    text = memojson['text']
    with sqlite3.connect(load_config.main_data_path) as conn:
        conn.execute('BEGIN TRANSACTION')
        cur = conn.cursor()
        sql = 'INSERT INTO memos VALUES(NULL,?,?,?,?)'
        cur.execute(sql, (user_id, created_ts, updated_ts, text))
        cur.execute("SELECT last_insert_rowid()")
        inserted_id = cur.fetchone()[0]
        conn.commit()
    return inserted_id


def update_memo_text(memo_id: int, text: str):
    '''
    接受一个 memo 的 id, 然后修改对应 memo 的 text 字段
    '''
    with sqlite3.connect(load_config.main_data_path) as conn:
        conn.execute('BEGIN TRANSACTION')
        cur = conn.cursor()
        sql = 'UPDATE memos SET text=? WHERE id=?'
        cur.execute(sql, (text, memo_id))
        conn.commit()


def select_ten_memo_after_ts_and_gen_json(token: str, ts: int):
    '''
    从数据库中查询给定时间戳之后的前 10 条 memo 记录，并且生成 json 数组
    '''

    user_id = select_user_id_by_token(token)

    sql = '''
    SELECT id,text,created_ts,updated_ts
    FROM memos
    WHERE user_id = ? and created_ts < ? 
    ORDER BY created_ts DESC
    LIMIT 10;
    '''
    with sqlite3.connect(load_config.main_data_path) as conn:
        cur = conn.cursor()
        cur.execute(sql, (user_id, ts))
        memos: list = cur.fetchall()

    l = []
    for e in memos:
        l.append(dict(memo_id=e[0], text=e[1], created_ts=e[2], updated_ts=e[3]))
    return l


def delete_memo_by_id(memo_id: int):
    '''
    接受 memo_id 然后删除对应的 memo
    '''
    with sqlite3.connect(load_config.main_data_path) as conn:
        sql = '''DELETE FROM memos WHERE id = ?'''
        cur = conn.cursor()
        cur.execute(sql, (memo_id, ))
        rows_affected = cur.rowcount
        conn.commit()
    if rows_affected == 1:
        return True
    else:
        return False
