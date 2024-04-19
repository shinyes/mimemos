import os
import json

current_dir = os.path.dirname(os.path.abspath(__file__))

with open(os.path.join(current_dir, 'config.json')) as f:
    config = json.load(f)

# 部署的目录
root_dir = os.path.join(current_dir, '..')
# 主数据库的路径
main_data_path = os.path.join(current_dir, '..', config['main_data_path'])
# 数据库目录
database_file_path = os.path.join(current_dir, '..', config['database_file_path'])

# 避免外部访问
del config
del current_dir
