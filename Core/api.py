from flask import Flask, Response, request, jsonify
from pymongo import MongoClient
from alchemyapi import AlchemyAPI
from PIL import Image
import cStringIO
import urllib
import requests

from test import *

app = Flask(__name__)
app.config.update(
    DEBUG = True,
)

client = MongoClient('mongodb://localhost:27017/')
db = client.trumpcat
urls = db.urls

@app.route("/url", methods=["POST"])
def isTrump(url = None):

    if request.method == 'POST':
        url = request.args.get('url', '')
        exists = urls.find({'url':url})

        if exists.count() != 0:
            trump = exists[0]

            if trump["isTrump"]:
                return {'isTrump': True, "cat": trump["cat"]}
            else:
                return {"isTrump": False, "message":"set false in db"}

        # alchemyapi = AlchemyAPI()
        # response = alchemyapi.faceTagging("url", url)

        response = doIt(url)

        # if response.has_key('imageFaces'):
        #   for i in response['imageFaces']:
        #       if i.has_key('identity') and  i['identity']['name'] == "Donald Trump":

        if response == 1:
            file = cStringIO.StringIO(urllib.urlopen(url).read())
            img = Image.open(file)
            width = img.size[0]
            height = img.size[1]
            cat = "https://placekitten.com/%s/%s" %(str(width), str(height))
            urls.insert({'url': url, 'cat': cat, "isTrump": True})
            return jsonify(**{"isTrump": True, "cat": cat})

        elif response == 0:
            urls.insert({'url': url, 'isTrump': False, "message": "found false in db"})
            return jsonify(**{'isTrump': False})

        else:
            urls.insert({'url': url, 'isTrump': False, "message": "request did not complete"})
            return jsonify(**{"isTrump": False})

