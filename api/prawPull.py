import praw
import re

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
        
        urlList["%s"%post.url] = "https://reddit.com%s"%post.permalink
        i = i + 1
        if i == 64:
            break
        
        #print(post.url)

    #print(urlList)
    #print(urlList)
    #print(len(urlList))
    
    return urlList


