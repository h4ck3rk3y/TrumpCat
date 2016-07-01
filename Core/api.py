from flask import request, url_for
from flask.ext.api import FlaskAPI, status, exceptions
from pymongo import MongoClient
from alchemyapi import AlchemyAPI
from PIL import Image
import cStringIO
import urllib

from test import *


app = FlaskAPI(__name__)
client = MongoClient('mongodb://localhost:27017/')
db = client.trumpcat
urls = db.urls

@app.route("/url", methods=["POST"])
def isTrump():

	if not request.json.has_key('url'):
		return {"isTrump": False, "message" : "no url specified"}

	url = request.json['url']
	exists = urls.find({'url':url})

	if exists.count() != 0:
		trump = exists[0]

		if trump["isTrump"]:
			return {'isTrump': True, "cat": trump["cat"]}
		else:
			return {"isTrump": False, "message":"set false in db"}


	response = doIt(url)

	if response == 1:
		file = cStringIO.StringIO(urllib.urlopen(url).read())
		img = Image.open(file)
		width = img.size[0]
		height = img.size[1]
		cat = "https://placekitten.com/%s/%s" %(str(width), str(height))
		urls.insert({'url': url, 'cat': cat, "isTrump": True})
		return {"isTrump": True, "cat": cat}

	elif response == 0:
		urls.insert({'url': url, 'isTrump': False, "message": "found false in db"})
		return {'isTrump': False}
	else:
		urls.insert({'url': url, 'isTrump': False, "message": "request did not complete"})
		return {"isTrump": False}

