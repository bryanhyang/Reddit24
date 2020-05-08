import atexit
import prawPull
import sys
import json

from os import environ
from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime
from flask import Flask, request, jsonify
#from flask_mongoengine import MongoEngine
from mongoengine import *
app = Flask(__name__)

# Global Variables ----------------------------------------
today = datetime.today()

# MongoDB -------------------------------------------------

MONGODB_URI = environ.get('MONGODB')
print(MONGODB_URI)

connect(db = "subreddits",host=MONGODB_URI)

# creating model
class Submission(EmbeddedDocument):
    image = URLField(required=True)
    link = URLField(required=True)

class Day(Document):
    date = StringField(required=True)
    submissions = ListField(EmbeddedDocumentField(Submission))

# Routing -------------------------------------------------
@app.route('/hello')
def hello_world():
   return 'Hello World'

@app.route('/date/<client_date>')
def date(client_date):
    try:
        target = datetime.strptime(client_date, "%Y-%m-%d")
    except ValueError:
        print('Invalid date', file=sys.stderr)
        return {'date': ''}
    diff = today - target
    if diff.days > 0:
        print('Valid date', file=sys.stderr)
        print(client_date)
        mongoRes = Day.objects(date = client_date).first()
        if mongoRes == None:
            abort(404)
        return mongoRes.to_json()
    else:
        print('Invalid date', file=sys.stderr)
        return {'date': ''}

    return {'date': str(client_date)}

@app.route('/')
def landing():
    return 'Hello World'

@app.route('/time')
def get_time():
    return {'time': time.time()}

# Non-routing functions -----------------------------------
@app.before_first_request
def updateDB():
    data = prawPull.pullTop()
    print(data)
    tmp = Day(date=datetime.today().strftime('%Y-%m-%d'), submissions=[])
    for k,v in data.items():
       tmp.submissions.append(Submission(image=k, link=v))
    tmp.save()
    print(tmp)

# Scheduler -----------------------------------------------

scheduler = BackgroundScheduler()
scheduler.add_job(func=updateDB, trigger="interval", seconds=3600) # set to 3 seconds for testing, otherwise 3600
scheduler.start()

# Shut down the scheduler when exiting the app
atexit.register(lambda: scheduler.shutdown())


if __name__ == '__main__':
    app.run(use_reloader=False)
