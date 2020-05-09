from os import environ

MONGODB_URI = environ.get('MONGODB')
CLIENT = environ.get('CLIENT')
PASSWORD = environ.get('PASSWORD')
SECRET = environ.get('SECRET')
