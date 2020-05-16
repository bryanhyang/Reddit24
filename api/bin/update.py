#!/usr/bin/env python3

import os, sys
sys.path.append(os.path.dirname(os.getcwd()))

import database as db

print('Hello')
print(db.genToday())