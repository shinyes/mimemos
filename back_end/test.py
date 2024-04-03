from time import time

from fn_abou_db.memo import select_ten_memo_after_ts_and_gen_json

print(select_ten_memo_after_ts_and_gen_json(int(time())))
