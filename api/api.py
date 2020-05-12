import atexit
import prawPull
import sys

from apscheduler.schedulers.background import BackgroundScheduler
from dotenv import load_dotenv
from datetime import datetime
from flask import Flask
from flask_mongoengine import MongoEngine

# Flask config --------------------------------------------

load_dotenv('.env')

app = Flask(__name__, static_folder='../app/build', static_url_path='/')

app.config.from_pyfile('settings.py')

# Global Variables ----------------------------------------

todayDate = datetime.today().strftime('%Y%m%d') # today's date
todaySub = '' # today's submissions

# MongoDB -------------------------------------------------

app.config['MONGODB_SETTINGS'] = {
    'db': 'subreddits',
    'host': app.config.get("MONGODB_URI")
}

db = MongoEngine(app)

# creating model
class Submission(db.EmbeddedDocument):
    image = db.URLField(required=True)
    link = db.URLField(required=True)
    ratio = db.FloatField(required=True)

class Day(db.Document):
    date = db.StringField(required=True)
    submissions = db.ListField(db.EmbeddedDocumentField(Submission))
    meta = {'collection': 'frontpage'}

# Routing -------------------------------------------------
@app.route('/hello')
def hello_world():
   return {'Hello World':'hello world'}

@app.route('/date/<client_date>')
def date(client_date):
    # date conversion
    try:
        target = datetime.strptime(client_date, "%Y-%m-%d")
    except ValueError:
        print('Invalid date', file=sys.stderr)
        return {'date': ''}

    # date check
    diff = int(todayDate) - int(target.strftime('%Y%m%d'))
    if diff == 0:
        return todaySub
    elif diff > 0:
        mongoRes = Day.objects(date = client_date).get_or_404()
        print(mongoRes.to_json())
        return mongoRes.to_json()
    else:
        print('Invalid date', file=sys.stderr)
        abort(404)

@app.route('/today')
def today():
    return todaySub

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/time')
def get_time():
    return {'time': time.time()}

# Non-routing functions -----------------------------------
@app.before_first_request
def checkDB():
    global todayDate, todaySub
    todayDate = datetime.today().strftime('%Y%m%d') # update even if the same
    mongoRes = Day.objects(date = todayDate).first()
    # check if fetch succeeded
    if mongoRes == None:
        print('Generated todaySub', file=sys.stderr)
        updateDB(save=False)
    else:
        print('Fetched todaySub', file=sys.stderr)
        todaySub = mongoRes.to_json()

def updateDB(save=True):
    data = prawPull.pullTop(app.config.get("CLIENT"), \
                        app.config.get("PASSWORD"), \
                        app.config.get("SECRET"))
    tmp = Day(date=todayDate[:4] + '-' + todayDate[4:6] + '-' + todayDate[6:], submissions=[])
    for k,v in data.items():
        tmp.submissions.append(Submission(image=k, link=v[0], ratio=v[1]))
    if save:
        tmp.save()
    global todaySub
    todaySub = tmp.to_json()
    
# Scheduler -----------------------------------------------

scheduler = BackgroundScheduler()
scheduler.add_job(func=updateDB, trigger="interval", days=1)
scheduler.start()

# Shut down the scheduler when exiting the app
atexit.register(lambda: scheduler.shutdown())


if __name__ == '__main__':
    app.run(use_reloader=False)
