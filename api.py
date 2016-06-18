from flask import request, url_for
from flask.ext.api import FlaskAPI, status, exceptions
from pymongo import MongoClient
from alchemyapi import AlchemyAPI


app = FlaskAPI(__name__)
client = MongoClient('mongodb://localhost:27017/')
db = client.trumpcat
urls = db.urls

@app.route("/<url>", methods=["GET"])
def isTrump(url):

	exists = urls.find({'url':url})

	if exists.count() != 0:
		return {'isTrump': exist[0]['istrump']}

	alchemyapi = AlchemyAPI()

	response = alchemyapi.faceTagging("url", url).json()

	if response.has_key('imageFaces'):
		for i in response['imageFaces']:
			if i['identitiy']['name'] == "Donald Trump":
				exists.insert({'url': url, 'status': True})
				return {"isTrump": True}

		exists.insert({'url': url, 'status': False})
		return {'isTrump': False}
	else:
		exists.insert({'url': url, 'status': False})
		return {"isTrump": False}

