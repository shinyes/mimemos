import hashlib


def gen_sha256(s: str):
    hashobject = hashlib.sha256()
    hashobject.update(bytes(s, encoding='utf-8'))
    return hashobject.hexdigest()
