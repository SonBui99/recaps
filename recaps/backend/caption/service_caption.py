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
from sqlalchemy import create_engine, and_
from sqlalchemy.orm import sessionmaker, joinedload
import datetime

import fasttext
import datetime
from keras.models import load_model
import os
from ..model import session
#load model AI
emo_md = load_model('statics/model/Image_emotion/imageclassifier.h5')
ft_md = fasttext.load_model('statics/model/cc.vi.300.bin')

def add_image_service(user_id):
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
        new_image = Image(url=str(filelink), user_id=user_id, upload_time=datetime.datetime.now())
        session.add(new_image)
        session.commit()
        return jsonify({'image_dir': filelink, 'user_id':user_id, 'upload_time':datetime.datetime.now()})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
def get_all_captions_admin_service(user_id):
    from ..model import Caption
    all_captions = session.query(Caption).filter_by(author_id=user_id).all()
    tmp = []
    for caption in all_captions:
        tags = caption.tags
        print(bool(caption.emotion), caption.emotion, caption.id)
        tmp.append({'id':caption.id, 'content':caption.content, 'author_id':user_id, 'created_at':caption.created_at, 'emotion':caption.emotion, 'tag': [tag.name for tag in tags]})
    return jsonify(tmp)

def get_all_tag_service(user_id):
    from ..model import Tag
    tags = session.query(Tag).all()
    output = []
    for tag in tags:
        output.append({"tag_id": tag.id, "tag_name": tag.name})
    return jsonify(output)

def get_caption_favorite_service(user_id):
    from ..model import User
    user = session.query(User).get(user_id)
    favorite_captions = user.favourite_captions
    tmp = []
    for caption in favorite_captions:
        tags = caption.tags
        tmp.append({'id':caption.id, 'content':caption.content, 'author_id': user_id, 'created_at':caption.created_at, 'emotion':caption.emotion, 'tag': [tag.name for tag in tags]})
    return jsonify(tmp)

def add_caption_service(user_id):
    from ..model import Caption, Tag
    text = request.json["content"]
    emotion = request.json["emotion"]
    # print(emotion)
    tags = request.json["tag"]
    caption = session.query(Caption).filter(Caption.content == text).first()
    if caption:
        raise "Caption already exits"
    else:
        newCaption = Caption(
            content=text,
            emotion=bool(emotion), 
            created_at=datetime.datetime.now(),
            author_id=user_id,
        )
        n_tag = list()
        for tag in tags:
            tag_qr = session.query(Tag).filter(Tag.name == tag).first()
            if tag:
                n_tag.append(tag_qr)
        newCaption.tags = n_tag 
        session.add(newCaption)
        session.commit()
    return {'content':text, 'author_id':user_id, 'created_at':datetime.datetime.now(), 'emotion':emotion, 'tag': tags}

def delete_caption_service(user_id):
    from ..model import Caption, Favourite, caption_tag, Tag, user_favourite_caption
    from sqlalchemy import delete
    msg = None
    caption_id = request.json['id']

    caption_to_delete = session.query(Caption).filter(Caption.id == caption_id).one()
    if caption_to_delete.author_id != user_id:
        msg = "This caption is not belong to you"
        return jsonify({'Message': msg})
    
    stmt = delete(user_favourite_caption).where(user_favourite_caption.c.caption_id == caption_id)
    session.execute(stmt)

    # Xóa caption khỏi bảng favourites
    favourites_to_delete = session.query(Favourite).filter(Favourite.caption_id == caption_id).all()
    for favourite in favourites_to_delete:
        session.delete(favourite)

    # Xóa các bản ghi trong bảng trung gian caption_tag
    tags_to_delete = session.query(Tag).join(caption_tag).filter(caption_tag.c.caption_id == caption_id).all()
    for tag in tags_to_delete:
        caption_to_delete.tags.remove(tag)

    # Xóa caption
    session.delete(caption_to_delete)

    # Lưu các thay đổi vào cơ sở dữ liệu
    session.commit()
    
    return jsonify({'Message': "Done"}), 200

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
    from ..model import Caption
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
        emotion = emotion_img(filelink, emo_md)
        translator = Translator()
        des = translator.translate(des, dest="vi").text
        list_cap = []
        vector_des = sentence_embedding(des, ft_md)
        captions = session.query(Caption).filter(and_(Caption.author_id == 1, Caption.emotion == emotion)).all()
        for caption in captions:
            vector_cap = sentence_embedding(caption.content, ft_md)
            similarity = cosine_similarity([vector_des], [vector_cap])[0][0]
            similarity = round(similarity*100, 2)
            if 50 <= similarity <= 100:
                tags = caption.tags
                list_cap.append({'id':caption.id, 'content':caption.content, 'similarity':similarity, 'tag': [tag.name for tag in tags]})
        return jsonify(list_cap)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
def get_list_caption_login_service(user_id):
    from ..model import Caption
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
        emotion = emotion_img(filelink, emo_md)
        translator = Translator()
        des = translator.translate(des, dest="vi").text
        list_cap = []
        vector_des = sentence_embedding(des, ft_md)
        captions = session.query(Caption).filter(and_(Caption.author_id == user_id, Caption.emotion == emotion)).all()
        # print(len(captions))
        for caption in captions:
            vector_cap = sentence_embedding(caption.content, ft_md)
            similarity = cosine_similarity([vector_des], [vector_cap])[0][0]
            similarity = round(similarity*100, 2)
            if 50 <= similarity <= 100:
                tags = caption.tags
                list_cap.append({'id':caption.id, 'content':caption.content, 'similarity':similarity, 'tag': [tag.name for tag in tags]})
        # print(len(list_cap))
        return jsonify(list_cap)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def get_list_tag_service(user_id):
    from ..model import caption_tag , Caption, Tag
    captions = session.query(Caption).options(joinedload(Caption.tags)).join(caption_tag).join(Tag).all()
    output = {}
    for caption in captions:
        output[caption.content] = [tag.name for tag in caption.tags]
    return jsonify(output)

def get_tag_by_id_service(user_id):
    from ..model import Tag, Caption
    id = request.json['id']
    result = session.query(Caption.content, Tag.name, Tag.id).join(Caption.tags).filter(Caption.id == id).all()
    if result:
        return jsonify({"Caption": result[0][0], "tag_name": [tag[1] for tag in result], "tag_id": [tag[2] for tag in result]})
    else:
        msg = "This id is not exist"
        return msg

def add_favorite_service(user_id):
    from ..model import User, Caption, Favourite
    id = request.json['id']
    user = session.query(User).filter_by(id=user_id).first()
    caption = session.query(Caption).filter_by(id=id).first()
    if caption:
        user.favourite_captions.append(caption)
        session.add(user)
        session.commit()
        newFavourite = Favourite(
            user_id=user_id,
            caption_id=caption.id, 
            status=True
        )
        session.add(newFavourite)
        session.commit()
        return jsonify({"id": caption.id, "caption": caption.content, "user": user.username})
    else:
        return "This id is not exist"

def remove_favorite_service(user_id):
    from ..model import User, Caption, user_favourite_caption
    id = request.json['id']
    caption = session.query(user_favourite_caption).filter_by(caption_id=id).first()
    if caption:
        delete_statement = user_favourite_caption.delete().where(and_(user_favourite_caption.c.user_id == user_id, user_favourite_caption.c.caption_id == id))
        session.connection().execute(delete_statement)
        session.commit()
        return jsonify({"Message":"Done"}), 200
    else:
        return "This id is not exist"

def edit_content_service(user_id):
    from ..model import Caption
    msg = None
    id = request.json['id']
    caption = session.query(Caption).filter_by(id=id).first()
    new_content = request.json['content']
    if caption.author_id != user_id:
        msg = "This caption is not belong to you"
        return jsonify({"Message": msg})
    else:
        caption.content=new_content
        session.commit()
        msg = "Done"
        return jsonify({"Message": msg})

def edit_emotion_service(user_id):
    from ..model import Caption
    msg = None
    id = request.json['id']
    caption = session.query(Caption).filter_by(id=id).first()
    new_emotion = request.json['emotion']
    if caption.author_id != user_id:
        msg = "This caption is not belong to you"
        return jsonify({"Message": msg})
    else:
        caption.emotion=new_emotion
        session.commit()
        msg = "Done"
        return jsonify({"Message": msg})

def edit_tag_id_service(user_id):
    from ..model import Caption, caption_tag, Tag
    from sqlalchemy import update
    msg = None
    id = request.json['id']
    caption = session.query(Caption).filter_by(id=id).first()
    new_tag_id = request.json['tag_id']
    if caption.author_id != user_id:
        msg = "This caption is not belong to you"
        return jsonify({"Message": msg})
    
    ct = session.query(caption_tag).filter_by(caption_id=id).first()
    if new_tag_id == ct.tag_id:
        msg = "Tag id is already exist"
        return jsonify({"Message": msg})
    else:
        stmt = update(caption_tag).where(caption_tag.c.caption_id == id).values(tag_id=new_tag_id, tag_name=session.query(Tag).filter_by(id=new_tag_id).first().name)
        session.execute(stmt)
        session.commit()
        msg = "Done"
        return jsonify({"Message": msg})
