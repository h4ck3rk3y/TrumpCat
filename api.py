from flask import request, url_for
from flask.ext.api import FlaskAPI, status, exceptions
from pymongo import MongoClient
from alchemyapi import AlchemyAPI
from PIL import Image
import cStringIO
import urllib

app = FlaskAPI(__name__)
client = MongoClient('mongodb://localhost:27017/')
db = client.trumpcat
urls = db.urls

@app.route("/url", methods=["POST"])
def isTrump():

	url = request.json['url']
	exists = urls.find({'url':url})

	if exists.count() != 0:
		trump = exists[0]

		if trump["isTrump"]:
			return {'isTrump': True, "cat": trump["cat"]}
		else:
			return {"isTrump": False}

	alchemyapi = AlchemyAPI()

	response = alchemyapi.faceTagging("url", url)

	if response.has_key('imageFaces'):
		for i in response['imageFaces']:

			if i.has_key('identity') and  i['identity']['name'] == "Donald Trump":
				file = cStringIO.StringIO(urllib.urlopen(url).read())
				img = Image.open(file)
				width = img.size[0]
				height = img.size[1]
				cat = "https://placekitten.com/%s/%s" %(str(width), str(height))
				urls.insert({'url': url, 'cat': cat, "isTrump": False})
				return {"isTrump": True, "cat": cat}

		urls.insert({'url': url, 'isTrump': False})
		return {'isTrump': False}
	else:
		urls.insert({'url': url, 'isTrump': False})
		return {"isTrump": False}

