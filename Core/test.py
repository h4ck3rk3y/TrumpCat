import cv2, io
from PIL import Image
import pickle
import numpy as np
import urllib2

cascadePath = "haarcascade_frontalface_default.xml"
faceCascade = cv2.CascadeClassifier(cascadePath)

images = pickle.load(open("pickle.p"))
recognizer = cv2.createLBPHFaceRecognizer()
recognizer.train(images, np.array([1]*len(images)))


def doIt(url):

    fd = urllib2.urlopen(url)
    image_file = io.BytesIO(fd.read())

    predict_image_pil = Image.open(image_file).convert("L")

    predict_image = np.array(predict_image_pil, 'uint8')
    faces = faceCascade.detectMultiScale(predict_image)
    min_conf = 32768
    
    for (x, y, w, h) in faces:
        pred, conf = recognizer.predict(predict_image[y: y + h, x: x + w])
        if conf < min_conf:
            min_conf = conf
            
    #GYANI - MODIFY RETURN AS PER REQS.
    if min_conf <= 50:
        return 1
    else:
        return 0
#doIt("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBmk4vBKlrKB_qwBeG0KZzmmLU1i_QGxLw2w--AfgkwYUA8CRb")