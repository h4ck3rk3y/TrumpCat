from tornado.wsgi import WSGIContainer
from tornado.ioloop import IOLoop
from tornado.web import FallbackHandler, RequestHandler, Application
from api  import app

class MainHandler(RequestHandler):
  def get(self):
    self.write("Tornado")

tr = WSGIContainer(app)

application = Application([
(r"/tornado", MainHandler),
(r".*", FallbackHandler, dict(fallback=tr)),
],debug=True)

if __name__ == "__main__":
  application.listen(80,'ec2-52-50-209-51.eu-west-1.compute.amazonaws.com')
  IOLoop.instance().start()