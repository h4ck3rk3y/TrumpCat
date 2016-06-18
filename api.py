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
		return {'isTrump': exists[0]['istrump']}

	alchemyapi = AlchemyAPI()

	response = alchemyapi.faceTagging("url", url)

	if response.has_key('imageFaces'):
		for i in response['imageFaces']:
			print imageFaces
			if i.has_key('identity') and  i.has_key('identity') and  i['identitiy']['name'] == "Donald Trump":
				file = cStringIO.StringIO(urllib.urlopen(url).read())
				img = Image.open(file)
				width = im.size[0]
				height = im.size[1]
				cat = "https://placekitten.com/%s/%s" %(str(width), str(height))
				exists.insert({'url': url, 'cat': cat})
				return {"isTrump": True}

		urls.insert({'url': url, 'status': False})
		return {'isTrump': False}
	else:
		urls.insert({'url': url, 'status': False})
		return {"isTrump": False}

