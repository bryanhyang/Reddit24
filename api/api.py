import atexit
import prawPull
import sys
import json

from os import environ
from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime
from flask import Flask, request, jsonify
from flask_mongoengine import MongoEngine
app = Flask(__name__)

# Global Variables ----------------------------------------
today = datetime.today()

# MongoDB -------------------------------------------------

MONGODB_URI = environ.get('MONGODB')

app.config["MONGODB_HOST"] = DB_URI

db = MongoEngine(app)
db.init_app(app)

# creating model
class Submission(db.EmbeddedDocument):
    image = db.URLField(required=True))
    link = db.URLField(required=True))

class Day(db.Document):
    date = db.DateTimeField(required=True)
    submissions = db.ListField(EmbeddedDocumentField(Submission))


# Routing -------------------------------------------------
@app.route('/hello')
def hello_world():
   return 'Hello World'

@app.route('/date/<date>')
def date(date):
    try:
        target = datetime.strptime(date, "%Y-%m-%d")
    except ValueError:
        print('Invalid date', file=sys.stderr)
        return {'date': ''}
    diff = today - target
    if diff.days > 0:
        print('Valid date', file=sys.stderr)
        return {'date': str(date)}
    else:
        print('Invalid date', file=sys.stderr)
        return {'date': ''}

    return {'date': str(date)}

@app.route('/')
def landing():
    return 'Hello World'

@app.route('/time')
def get_time():
    return {'time': time.time()}

# Non-routing functions -----------------------------------
def updateDB():
    print('EEE ERR', file=sys.stderr)
    data = prawPull.pullTop()

    #print(data)


# Scheduler -----------------------------------------------

scheduler = BackgroundScheduler()
scheduler.add_job(func=updateDB, trigger="interval", seconds=10) # set to 3 seconds for testing, otherwise 3600
scheduler.start()

# Shut down the scheduler when exiting the app
atexit.register(lambda: scheduler.shutdown())

if __name__ == '__main__':
      app.run(use_reloader=False)
