from tornado.wsgi import WSGIContainer
from tornado.ioloop import IOLoop
from tornado.web import FallbackHandler, RequestHandler, Application
from api  import app
import tornado.httpserver


class MainHandler(RequestHandler):
  def get(self):
    self.write("Tornado")

tr = WSGIContainer(app)

application = Application([
(r"/tornado", MainHandler),
(r".*", FallbackHandler, dict(fallback=tr)),
],debug=True)

http_server = tornado.httpserver.HTTPServer(application, ssl_options = {"certfile": "/etc/letsencrypt/live/gyani.xyz/cert.pem", "keyfile": "/etc/letsencrypt/live/gyani.xyz/privkey.pem"})


if __name__ == "__main__":
  http_server.listen(443)
  IOLoop.instance().start()
