from flask import request, url_for
from flask.ext.api import FlaskAPI, status, exceptions
from pymongo import MongoClient
from alchemyapi import AlchemyAPI


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
				exists.insert({'url': url, 'status': True})
				return {"isTrump": True}

		urls.insert({'url': url, 'status': False})
		return {'isTrump': False}
	else:
		urls.insert({'url': url, 'status': False})
		return {"isTrump": False}

