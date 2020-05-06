import time
from flask import Flask
app = Flask(__name__)

@app.route('/hello')
def hello_world():
   return 'Hello World'

@app.route('/<date>')
def date(date):
    return str(date)

@app.route('/time')
def get_time():
    return {'time': time.time()}
    

if __name__ == '__main__':
      app.run()
