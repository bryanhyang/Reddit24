from datetime import datetime
import sys
from flask import Flask
app = Flask(__name__)

@app.route('/hello')
def hello_world():
   return 'Hello World'

@app.route('/<date>')
def date(date):
    try:
        target = datetime.strptime(date, "%Y-%m-%d")
    except ValueError:
        print('Invalid date', file=sys.stderr)
        return {'date': ''}
    current = datetime.today()
    diff = current - target
    if diff.days > 0:
        print('Valid date', file=sys.stderr)
        return {'date': str(date)}
    else:
        print('Invalid date', file=sys.stderr)
        return {'date': ''}

    return {'date': str(date)}

@app.route('/time')
def get_time():
    return {'time': time.time()}
    

if __name__ == '__main__':
      app.run()
