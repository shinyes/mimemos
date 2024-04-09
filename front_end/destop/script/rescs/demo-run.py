from flask import Flask, send_file, send_from_directory

app = Flask(__name__)


@app.route('/')
def index():
    return send_file('main2.html')


@app.route('/<path:filename>')
def get_file(filename):
    print(filename)
    return send_from_directory('.', filename)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=9909)
