import praw
import re

import urllib
from PIL import ImageFile

def pullTop(client: str, pswd: str, secret: str):
    bot = praw.Reddit(client_id=client, client_secret=secret, username='Reddit24Bot', password=pswd, user_agent='Reddit24')

    topReddit = bot.front.top("day", limit = 150)
    urlList = {}
    split = '\n'

    regex = re.compile(r'(.(jpg|png))$')

    i = 0

    for post in topReddit:
        if((regex.search(post.url)) == None):
            continue

        #get ratio
        ratio = 1

        with urllib.request.urlopen(post.url) as file:
            size = file.headers.get("content-length")
            
            p = ImageFile.Parser()
            while 1:
                data = file.read(1024)
                if not data:
                    break
                p.feed(data)
                if p.image:
                    ratio = p.image.size[1]/p.image.size[0]
                    break
        
        keyVal = ["https://reddit.com%s"%post.permalink, ratio]
        
        #create dict
        urlList["%s"%post.url] = keyVal
        i = i + 1
        if i == 24:
            break
        
        #print(post.url)

    #print(urlList)
    #print(urlList)
    #print(len(urlList))
    
    return urlList


