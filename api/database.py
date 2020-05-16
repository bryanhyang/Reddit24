from mongoengine import *
from datetime import datetime, date
from os import environ
from dotenv import load_dotenv
import prawPull

load_dotenv('.env')
# get necessary env variables
MONGODB_URI = environ.get('MONGODB')
CLIENT = environ.get('CLIENT')
PASSWORD = environ.get('PASSWORD')
SECRET = environ.get('SECRET')

# get today's date
todayDate = date.today() # today's date

# connect to the database
connect(db='subreddits', host=MONGODB_URI)

# creating model
class Submission(EmbeddedDocument):
    image = URLField(required=True)
    link = URLField(required=True)
    ratio = FloatField(required=True)

class Day(Document):
    date = DateTimeField(required=True, primary_key=True)
    submissions = ListField(EmbeddedDocumentField(Submission))
    meta = {'collection': 'frontpage'}

# functions 
def getDay(date: str = '') -> Day:
    print(date)
    if not len(date):
        checkDate()
        mongoRes = Day.objects(date=todayDate).first()
    else:
        client_date = datetime.strptime(date, '%Y-%m-%d')
        if client_date == None:
            return None
        mongoRes = Day.objects(date=date).first()
    
    if (not len(date)) and mongoRes == None:
        return genToday().to_json()
    elif mongoRes == None:
        return mongoRes
    return mongoRes.to_json()

def genToday(save: bool=True) -> Day:
    data = prawPull.pullTop(CLIENT, PASSWORD, SECRET)
    tmp = Day(date=todayDate, submissions=[])
    for k,v in data.items():
        tmp.submissions.append(Submission(image=k, link=v[0], ratio=v[1]))
    if save:
        tmp.save()
    return tmp

def eoDay():
    checkDate()
    genToday()

def checkDate():
    global todayDate
    todayDate = date.today()
