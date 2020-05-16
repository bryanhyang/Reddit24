import prawPull
import sys
import database as db

from flask import Flask, abort, jsonify

# Flask config --------------------------------------------
app = Flask(__name__, static_folder='../app/build', static_url_path='/')

# Routing -------------------------------------------------
@app.route('/hello')
def hello_world():
   return {'Hello World':'hello world'}

@app.route('/date/<client_date>')
def date(client_date: str):
    res = db.getDay(client_date)
    if not res:
        abort(jsonify(message="Could not find that day"), 404)
    return res

@app.route('/today')
def today():
    return db.getDay()

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/time')
def get_time():
    return {'time': time.time()}
    
if __name__ == '__main__':
    app.run(use_reloader=False)
