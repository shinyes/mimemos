# import logging
from flask import Flask, request, send_from_directory
# 运行这个脚本用于加载配置
import load_config

# 等进入正式运行的版本之后就可以开启 log 日志
# 设置日志记录器
# logging.basicConfig(filename=load_config.root_dir + '/log/run.log', level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')
# logger = logging.getLogger(__name__)

app = Flask(__name__)

from fn_viewport.root import root_bp
from fn_viewport.index import index_bp

app.register_blueprint(root_bp)
app.register_blueprint(index_bp)


@app.route('/<path:filename>')
def get_file(filename):
    return send_from_directory('../front_end/destop', filename)


# # 响应 script 中的文件的请求，并发送文件
# @app.route('/script/<path:filename>')
# def get_script(filename):
#     directory = '../front_end/destop/script'
#     return send_from_directory(directory, filename)

# # 响应 style 中的文件的请求，并发送文件
# @app.route('/style/<path:filename>')
# def get_style(filename):
#     directory = '../front_end/destop/style'
#     return send_from_directory(directory, filename)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5050)
