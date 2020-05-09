import atexit
import prawPull
import sys
import json

from os import environ
from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime
from flask import Flask, request, jsonify
from flask_mongoengine import MongoEngine
# from mongoengine import *
app = Flask(__name__)

# MongoDB -------------------------------------------------

app.config.from_pyfile('settings.py')

app.config['MONGODB_SETTINGS'] = {
    'db': 'subreddits',
    'host': app.config.get("MONGODB_URI")
}

db = MongoEngine(app)

# creating model
class Submission(db.EmbeddedDocument):
    image = db.URLField(required=True)
    link = db.URLField(required=True)

class Day(db.Document):
    date = db.StringField(required=True)
    submissions = db.ListField(db.EmbeddedDocumentField(Submission))
    meta = {'collection': 'frontpage'}

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
        mongoRes = Day.objects(date = client_date).get_or_404()
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
    data = prawPull.pullTop(app.config.get("CLIENT"), \
                            app.config.get("PASSWORD"), \
                            app.config.get("SECRET"))

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
