from flask import Blueprint, g, redirect, url_for, render_template_string
from sqlalchemy.orm import sessionmaker
import requests
from flask_jwt_extended import(
    get_jwt,
    create_access_token,
    set_access_cookies,
    jwt_required
)
# from datetime import datetime, timezone, timedelta
# from .model import User
# from .model import engine

#Session = sessionmaker(bind=engine)
#Session.configure(bind=engine)

bp = Blueprint("auth", __name__, url_prefix="/auth")

@bp.before_app_request
@jwt_required(optional=True)
def load_logged_in_user():
    from .model import User
    from .model import engine
    from flask_jwt_extended import get_jwt_identity
    
    Session = sessionmaker(bind=engine)
    Session.configure(bind=engine)

    g.dbsession = Session()

    current_identity = get_jwt_identity()
    if current_identity is None:
        g.user = None
    else:
        g.user = g.dbsession.query(User).filter_by(email=current_identity['email']).one()

@bp.route("/")
@bp.route("/index")
def index():
    response = requests.get('http://localhost:3000')
    return render_template_string(response.content)
    # return render_template("front-end/src/pages/index.tsx")