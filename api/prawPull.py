import praw
import re
import string

def pullTop():
    bot = praw.Reddit(client_id = 'MX3tIwS510bcIw', client_secret = 'S-FYOnj_NgdT8WYBlzUFXlCgxkM', username = 'Reddit24Bot', password = 'npmrunstart-api', user_agent = 'Reddit24')

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
        if(i == 64):
            break;
        
        #print(post.url)

    #print(urlList)
    #print(urlList)
    #print(len(urlList))
    
    return urlList


