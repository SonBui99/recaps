from flask import Blueprint, make_response, render_template_string, jsonify, request
from sqlalchemy.orm import sessionmaker
import requests

bp = Blueprint("auth", __name__, url_prefix="/auth")

# @bp.before_app_request

@bp.before_app_request
def before_request():
    headers = { 'Access-Control-Allow-Origin': '*',
               'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
               'Access-Control-Allow-Headers': 'Content-Type' }
    if request.method == 'OPTIONS':
        return jsonify(headers), 200

def check_user_login(request):
    from .model import User
    from .model import engine
    
    Session = sessionmaker(bind=engine)
    Session.configure(bind=engine)

    session = Session()
    try:
        auth_header = request.headers.get('Authorization')
        print(auth_header)
        if auth_header:
            auth_token = auth_header
        else:
            auth_token = ''
        if auth_token:
            resp = User.decode_auth_token(auth_token)
            # print(resp)
            if not isinstance(resp, str):
                user = session.query(User).filter_by(id=resp).first()
                # print(user.id)
                return user.id
            return None
        else:
            return None
    except IndexError:
        responseObject = {
            'status': 'fail',
            'message': 'Bearer token malformed.'
        }
        print(responseObject)
        return None
    


@bp.route("/")
@bp.route("/index")
def index():
    response = requests.get('http://localhost:3000')  
    return render_template_string(response.content)
    # return render_template("front-end/src/pages/index.tsx")