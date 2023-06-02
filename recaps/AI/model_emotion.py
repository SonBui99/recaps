import cv2
import numpy as np
import tensorflow as tf
from keras.models import load_model

def emotion_img(img_path, model):
    img = cv2.imread(img_path)
    resize = tf.image.resize(img, (256,256))
    yhat = model.predict(np.expand_dims(resize/255, 0))
    if yhat < 0.5: 
      return False #Sad
    else:
      return True #Happy
