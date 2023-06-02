from backend import create_app
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

app = create_app()
# db = SQLAlchemy(app)
db = SQLAlchemy()
ma = Marshmallow()
cacheNewFeed = []
