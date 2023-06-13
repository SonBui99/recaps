from sqlalchemy import Column, String, ForeignKey, create_engine, Integer, String, DateTime, Table, Boolean
from sqlalchemy.ext.declarative import declarative_base
import datetime
from sqlalchemy.orm import relationship, sessionmaker
import jwt

engine = create_engine("mariadb+mariadbconnector://root:123456789@127.0.0.1:3307/restapidb")
# engine = create_engine("mariadb+mariadbconnector://root:123456789@127.0.0.1:3307/restapidb")

# Tạo một session để thao tác với database
Session = sessionmaker(bind=engine)
session = Session()

# Khai báo base class cho các model
Base = declarative_base()


# Định nghĩa bảng User
class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False, unique=True)
    password = Column(String(255), nullable=False)

    # Quan hệ một-nhiều với bảng Image
    images = relationship('Image', backref='user')

    # Quan hệ một-nhiều với bảng Caption
    captions = relationship('Caption', backref='user')

    # Quan hệ nhiều-nhiều với bảng Favourite
    favourite_captions = relationship('Caption', secondary='user_favourite_caption')



    # def __init__(self, user_id, username, password, email):
    #     self.id = user_id
    #     self.username = username
    #     self.password = password
    #     self.email = email

    def encode_auth_token(self, user_id):
        """
        Generates the Auth Token
        :return: string
        """

        try:
            payload = {
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1),
                'iat': datetime.datetime.utcnow(),
                'sub': user_id
            }
            return jwt.encode(
                payload,
                'buiducson',
                algorithm='HS256'
            )
        except Exception as e:
            return e
    @staticmethod
    def decode_auth_token(auth_token):
        """
        Decodes the auth token
        :param auth_token:
        :return: integer|string
        """
        try:
            payload = jwt.decode(auth_token, 'buiducson', algorithms="HS256")
            return payload['sub']
        except jwt.ExpiredSignatureError:
            return 'Signature expired. Please log in again.'
        except jwt.InvalidTokenError:
            return 'Invalid token. Please log in again.'

# Định nghĩa bảng Images
class Image(Base):
    __tablename__ = 'images'
    id = Column(Integer, primary_key=True, autoincrement=True)
    url = Column(String(255), nullable=False)
    upload_time = Column(DateTime, nullable=False, default=datetime.datetime.now())

    # Quan hệ một-nhiều với bảng Caption
    captions = relationship('Caption', backref='image')

    # Quan hệ một-nhiều với bảng User
    user_id = Column(Integer, ForeignKey('users.id'))

# Định nghĩa bảng Caption
class Caption(Base):
    __tablename__ = 'captions'
    id = Column(Integer, primary_key=True, autoincrement=True)
    content = Column(String(255), nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.datetime.now())
    emotion = Column(String(255), nullable=False)

    # Quan hệ một-nhiều với bảng Image
    image_id = Column(Integer, ForeignKey('images.id'))

    # Quan hệ một-nhiều với bảng User
    author_id = Column(Integer, ForeignKey('users.id'))

    # Quan hệ nhiều-nhiều với bảng Tag
    tags = relationship('Tag', secondary='caption_tag')

# Định nghĩa bảng Tag
class Tag(Base):
    __tablename__ = 'tags'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)

    # Quan hệ nhiều-nhiều với bảng Caption
    captions = relationship('Caption', secondary='caption_tag', overlaps="tags")

# Định nghĩa bảng Favourite
class Favourite(Base):
    __tablename__ = 'favourites'
    id = Column(Integer, primary_key=True, autoincrement=True)

    # Quan hệ nhiều-nhiều với bảng User
    user_id = Column(Integer, ForeignKey('users.id'))

    # Quan hệ nhiều-nhiều với bảng Caption
    caption_id = Column(Integer, ForeignKey('captions.id'))
    status = Column(Boolean, default=False)

class BlacklistToken():
    """
    Token Model for storing JWT tokens
    """
    __tablename__ = 'blacklist_tokens'

    id = Column(Integer, primary_key=True, autoincrement=True)
    token = Column(String(500), unique=True, nullable=False)
    blacklisted_on = Column(DateTime, nullable=False)

    def __init__(self, token):
        self.token = token
        self.blacklisted_on = datetime.datetime.now()

    def __repr__(self):
        return '<id: token: {}'.format(self.token)

    @staticmethod
    def check_blacklist(auth_token):
        # check whether auth token has been blacklisted
        res = session.query(BlacklistToken).filter_by(token=str(auth_token)).first()
        if res:
            return True
        else:
            return False


# Định nghĩa bảng trung gian caption_tag
caption_tag = Table('caption_tag', Base.metadata,
                    Column('caption_id', Integer, ForeignKey('captions.id')),
                    Column('tag_id', Integer, ForeignKey('tags.id')),
                    Column('tag_name', String(255))
                    )

# Định nghĩa bảng trung gian user_favourite_caption
user_favourite_caption = Table('user_favourite_caption', Base.metadata,
                               Column('user_id', Integer, ForeignKey('users.id')),
                               Column('caption_id', Integer, ForeignKey('captions.id'))
                               )

# class UsersSchema(ma.Schema):
#     class Meta:
#         fields = ('id', 'username', 'password')

# class CaptionSchema(ma.Schema):
#     class Meta:
#         fields = ('id', 'content', 'author_id', 'created_at', 'emotion', 'tags')

# class TagSchema(ma.Schema):
#     class Meta:
#         fields = ('id', 'name')

# class CaptionTagSchema(ma.Schema):
#     class Meta:
#         fields = ('caption_id', 'tag_name', 'tag_id')

# class CaptionTagCountSchema(ma.Schema):
#     class Meta:
#         fields = ('caption_id', 'tag_id', 'count(1)')

# class FavoriteSchema(ma.Schema):
#     class Meta:
#         fields = ('caption_id', 'user_id', 'status')

# class DesSchema(ma.Schema):
#    class Meta:
#       fields = ('des',)

# class EmotionSchema(ma.Schema):
#    class Meta:
#       fields = ('emotion',)

# class CapListSchema(ma.Schema):
#    class Meta:
#       fields = ('id', 'content', 'similarity')

# des_schema = DesSchema()
# emotion_schema = EmotionSchema()
# cap_list_schema = CapListSchema(many=True)
# user_schema = UsersSchema()
# users_schema = UsersSchema(many=True)
# captions_schema = CaptionSchema(many=True)
# caption_tag_schema = CaptionTagSchema(many=True)
# caption_tag_count_schema = CaptionTagCountSchema(many=True)
# tag_schema = TagSchema()
# tags_schema = TagSchema(many=True)
# favorite_schema = FavoriteSchema(many=True)

# Tạo các bảng trong database
Base.metadata.create_all(engine)