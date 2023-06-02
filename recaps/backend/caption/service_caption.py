from flask import Blueprint, jsonify, request, g
#from ..model import Tag, Favourite, Caption, CaptionTag, captions_schema, des_schema, emotion_schema, cap_list_schema, caption_tag_count_schema, caption_tag_schema
from PIL import Image
from AI.model_captioning import generate_caption_img
from AI.model_emotion import emotion_img
from AI.sen2word_similarity import sentence_embedding
import fasttext 
# from flask_jwt_extended import jwt_required
from sklearn.metrics.pairwise import cosine_similarity
from googletrans import Translator
# import requests
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, joinedload
import datetime

from flask_jwt_extended import get_jwt_identity

import fasttext
import datetime
from keras.models import load_model
import os

#load model AI
emo_md = load_model('statics/model/Image_emotion/imageclassifier.h5')
ft_md = fasttext.load_model('statics/model/cc.vi.300.bin')

# Tạo đối tượng session
engine = create_engine("mariadb+mariadbconnector://root:123456789@127.0.0.1:3307/restapidb")
Session = sessionmaker(bind=engine)
session = Session()

def add_image_service():
    from ..model import Image
    if 'file' not in request.files:
        return jsonify({'error': 'no file provided'}), 400
    file = request.files['file']
    if not file:
        return jsonify({'error': 'invalid file'}), 400
    try:
        if not os.path.exists('statics/Images/uploads'):
            os.mkdir('statics/Images/uploads')
        filename = datetime.datetime.now().strftime("%Y-%m-%d-%H-%M-%S") + '-' + file.filename
        filelink = os.path.join('statics/Images/uploads', filename)
        file.save(filelink)
        user_id = g.user.id
        new_image = Image(url=str(filelink), user_id=user_id, upload_time=datetime.datetime.now())
        session.add(new_image)
        session.commit()
        return jsonify({'image_dir': filelink, 'user_id':user_id, 'upload_time':datetime.datetime.now()})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
def get_all_captions_admin_service():
    from ..model import Caption
    all_captions = session.query(Caption).filter(Caption.author_id == 1).all()
    tmp = []
    for caption in all_captions:
        tags = caption.tags
        tmp.append({'content':caption.content, 'author_id':1, 'created_at':caption.created_at, 'emotion':caption.emotion, 'tag': [tag.name for tag in tags]})
    return tmp

def get_caption_favorite_service():
    from ..model import User
    user = session.query(User).get(g.user.id)
    favorite_captions = user.favourite_captions
    tmp = []
    for caption in favorite_captions:
        tags = caption.tags
        tmp.append({'content':caption.content, 'author_id':1, 'created_at':caption.created_at, 'emotion':caption.emotion, 'tag': [tag.name for tag in tags]})
    return tmp

def add_caption_service():
    from ..model import Caption, captions_schema, Tag
    text = request.json["content"]
    emotion = request.json["emotion"]
    tags = request.json["tag"]
    caption = session.query(Caption).filter(Caption.content == text).first()
    if caption:
        raise "Caption already exits"
    else:
        newCaption = Caption(
            content=text,
            emotion=emotion, 
            created_at=datetime.datetime.now(),
            author_id=g.user.id,
        )
        n_tag = list()
        for tag in tags:
            tag_qr = session.query(Tag).filter(Tag.name == tag).first()
            if tag:
                n_tag.append(tag_qr)
        newCaption.tags = n_tag 
        session.add(newCaption)
        session.commit()
    return {'content':text, 'author_id':1, 'created_at':datetime.datetime.now(), 'emotion':emotion, 'tag': tags}

def delete_caption_service(id):
    from ..model import Caption, captions_schema
    msg = None
    caption = session.query(Caption).filter(Caption.id == id).first()
    if caption.author_id != g.user.id:
        msg = "This caption is not belong to you"
        return msg
    else:
        session.delete(caption)
        session.commit()
    return captions_schema.jsonify(caption)

def get_des_service():
    import os
    if 'file' not in request.files:
        return jsonify({'error': 'no file provided'}), 400
    file = request.files['file']
    if not file:
        return jsonify({'error': 'invalid file'}), 400
    try:
        img = Image.open(file)
        if not os.path.exists('statics/Images/uploads'):
            os.mkdir('statics/Images/uploads')
        filename = datetime.datetime.now().strftime("%Y-%m-%d-%H-%M-%S") + '-' + file.filename
        filelink = os.path.join('statics/Images/uploads', filename)
        img.save(filelink)
        caption = generate_caption_img(filelink)
        translator = Translator()
        des = translator.translate(str(caption), dest='vi').text
        return jsonify({"des": des})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
def get_emotion_service():
    from ..model import emotion_schema
    import os
    if 'file' not in request.files:
        return jsonify({'error': 'no file provided'}), 400

    file = request.files['file']
    if not file:
        return jsonify({'error': 'invalid file'}), 400

    try:
        img = Image.open(file)
        # xử lý ảnh tại đây
        if not os.path.exists('Statics/Images/uploads'):
            os.mkdir('Statics/Images/uploads')

        filename = datetime.datetime.now().strftime("%Y-%m-%d-%H-%M-%S") + '-' + file.filename
        filelink = os.path.join('Statics/Images/uploads', filename)
        img.save(filelink)
        emotion = emotion_img(filelink, emo_md)
        return jsonify({"emo": emotion})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


def get_list_caption_no_login_service():
    from ..model import Caption, cap_list_schema
    import os
    if 'file' not in request.files:
        return jsonify({'error': 'no file provided'}), 400

    file = request.files['file']
    if not file:
        return jsonify({'error': 'invalid file'}), 400
    try:
        img = Image.open(file)
        filelink = os.path.join('statics/Images/uploads', 'tmp.jpg')
        img.save(filelink)
        des = generate_caption_img(filelink)
        translator = Translator()
        des = translator.translate(des, dest="vi").text
        list_cap = []
        vector_des = sentence_embedding(des, ft_md)
        captions = session.query(Caption).filter(Caption.author_id == 1).all()
        for caption in captions:
            dict = {"content":[], "similarity":[]}
            vector_cap = sentence_embedding(caption.content, ft_md)
            similarity = cosine_similarity([vector_des], [vector_cap])[0][0]
            similarity = round(similarity*100, 2)
            if 50 <= similarity <= 100:
                dict["content"].append(caption.content)
                dict["similarity"].append(similarity)
                list_cap.append(dict)
        return cap_list_schema.jsonify(list_cap)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
def get_list_caption_login_service():
    from ..model import Caption, cap_list_schema
    import os
    if 'file' not in request.files:
        return jsonify({'error': 'no file provided'}), 400
    file = request.files['file']
    if not file:
        return jsonify({'error': 'invalid file'}), 400
    try:
        img = Image.open(file)
        if not os.path.exists('statics/Images/uploads'):
            os.mkdir('statics/Images/uploads')
        filename = datetime.datetime.now().strftime("%Y-%m-%d-%H-%M-%S") + '-' + file.filename
        filelink = os.path.join('statics/Images/uploads', filename)
        img.save(filelink)
        des = generate_caption_img(filelink)
        list_cap = []
        vector_des = sentence_embedding(des, ft_md)
        captions = session.query(Caption).all()
        for caption in captions:
            dict = {"content":[], "similarity":[]}
            vector_cap = sentence_embedding(caption.content, ft_md)
            similarity = cosine_similarity([vector_des], [vector_cap])[0][0]
            similarity = round(similarity*100, 2)
            if 50 <= similarity <= 100:
                dict["content"].append(caption.content)
                dict["similarity"].append(similarity)
                list_cap.append(dict)
        return cap_list_schema.jsonify(list_cap)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def get_list_tag_service():
    from ..model import caption_tag , Caption, Tag
    captions = session.query(Caption).options(joinedload(Caption.tags)).join(caption_tag).join(Tag).all()
    output = {}
    for caption in captions:
        output[caption.content] = [tag.name for tag in caption.tags]
    return jsonify(output)

def get_tag_by_id_service():
    from ..model import Tag, Caption
    id = request.json['id']
    result = session.query(Caption.content, Tag.name, Tag.id).join(Caption.tags).filter(Caption.id == id).all()
    if result:
        return jsonify({"Caption": result[0][0], "tag_name": [tag[1] for tag in result], "tag_id": [tag[2] for tag in result]})
    else:
        msg = "This id is not exist"
        return msg

def add_favorite_service():
    from ..model import User, Caption
    id = request.json['id']
    user = session.query(User).filter_by(id=g.user.id).first()
    caption = session.query(Caption).filter_by(id=id).first()
    if caption:
        user.favourite_captions.append(caption)

        session.add(user)
        session.commit()

        return jsonify({"caption": caption.content, "user": user.username})
    else:
        return "This id is not exist"

def remove_favorite_service():
    from ..model import User, Caption
    id = request.json['id']
    user = session.query(User).filter_by(id=g.user.id).first()
    caption = session.query(Caption).filter_by(id=id).first()
    if caption:
        user.favourite_captions.remove(caption)

        session.add(user)
        session.commit()

        return jsonify({"caption": caption.content, "user": user.username})
    else:
        return "This id is not exist"

def edit_content_service():
    from ..model import Caption, captions_schema
    msg = None
    id = request.json['id']
    caption = session.query(Caption).filter_by(id=id).first()
    new_content = request.json['content']
    if caption.author_id != g.user.id:
        msg = "This caption is not belong to you"
        return msg
    else:
        caption.content=new_content
        session.commit()
        msg = "Done"
        return msg

def edit_emotion_service():
    from ..model import Caption, captions_schema
    msg = None
    id = request.json['id']
    caption = session.query(Caption).filter_by(id=id).first()
    new_emotion = request.json['emotion']
    if caption.author_id != g.user.id:
        msg = "This caption is not belong to you"
        return msg
    else:
        caption.emotion=new_emotion
        session.commit()
        msg = "Done"
        return msg

def edit_tag_id_service():
    from ..model import Caption, caption_tag, Tag
    from sqlalchemy import update
    msg = None
    id = request.json['id']
    caption = session.query(Caption).filter_by(id=id).first()
    new_tag_id = request.json['tag_id']
    if caption.author_id != g.user.id:
        msg = "This caption is not belong to you"
        return msg
    
    ct = session.query(caption_tag).filter_by(caption_id=id).first()
    if new_tag_id == ct.tag_id:
        msg = "Tag id is already exist"
        return msg
    else:
        stmt = update(caption_tag).where(caption_tag.c.caption_id == id).values(tag_id=new_tag_id, tag_name=session.query(Tag).filter_by(id=new_tag_id).first().name)
        session.execute(stmt)
        session.commit()
        msg = "Done"
        return msg
