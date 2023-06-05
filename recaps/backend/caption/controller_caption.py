from flask import Blueprint, g, request, make_response
from .service_caption import (get_all_captions_admin_service, get_caption_favorite_service, get_des_service, get_emotion_service,
                      get_list_caption_login_service, get_list_caption_no_login_service , get_list_tag_service, get_tag_by_id_service,
                      add_caption_service, delete_caption_service, add_favorite_service, remove_favorite_service, edit_content_service,
                      edit_emotion_service, edit_tag_id_service, add_image_service, get_all_tag_service)

from flask_jwt_extended import jwt_required, get_jwt_identity

caption_bp = Blueprint("caption", __name__, url_prefix="/caption")

def _build_cors_preflight_response():
    response = make_response()
    # print("a")
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "*")
    response.headers.add("Access-Control-Allow-Methods", "*")
    return response

@caption_bp.route("/get_all_caption", methods=["GET", "OPTIONS"], endpoint='func1') #done
@jwt_required(optional=True)
def get_all_caption():
    # print(request)
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()
    elif request.method == 'GET':
        return get_all_captions_admin_service()

@caption_bp.route("/add_image", methods=["POST", "OPTIONS"], endpoint='func2') #done
@jwt_required(optional=True)
def add_image():
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()
    elif request.method == 'POST':
        return add_image_service()

@caption_bp.route("/get_caption_favorite", methods=["GET", "OPTIONS"], endpoint='func3') #done
@jwt_required(optional=True)
def get_caption_favorite():
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()
    elif request.method == 'GET':
        return get_caption_favorite_service()

@caption_bp.route("/get_des", methods=["POST", "OPTIONS"], endpoint='func4') #done
def get_des():
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()
    elif request.method == 'POST':
        return get_des_service()

@caption_bp.route("/get_emotion", methods=["POST", "OPTIONS"], endpoint='func5') #done
def get_emotion():
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()
    elif request.method == 'POST':
        return get_emotion_service()

@caption_bp.route("/get_list_caption_login", methods=["POST", "OPTIONS"], endpoint='func6') #done
@jwt_required(optional=True)
def get_list_caption_login():
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()
    elif request.method == 'POST':
        return get_list_caption_login_service()

@caption_bp.route("/get_list_caption_no_login", methods=["POST", "OPTIONS"], endpoint='func7') #done
def get_list_caption_no_login():
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()
    elif request.method == 'POST':
        return get_list_caption_no_login_service()

@caption_bp.route("/get_list_tag", methods=["GET", "OPTIONS"], endpoint='func8') #done
@jwt_required(optional=True)
def get_list_tag():
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()
    elif request.method == 'GET':
        return get_list_tag_service()

@caption_bp.route("/get_tag_by_id/", methods=["GET", "OPTIONS"], endpoint='func9') #done
@jwt_required(optional=True)
def get_tag_by_id():
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()
    elif request.method == 'GET':
        return get_tag_by_id_service()

@caption_bp.route("/get_all_tag", methods=["GET", "OPTIONS"], endpoint='func10') #done
@jwt_required(optional=True)
def get_all_tag():
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()
    elif request.method == 'GET':
        return get_all_tag_service()

@caption_bp.route("/add_caption", methods=["POST", "OPTIONS"], endpoint='func11') #done
@jwt_required(optional=True)
def add_caption():
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()
    elif request.method == 'POST':
        return add_caption_service()

@caption_bp.route("/delete_caption", methods=["POST", "OPTIONS"], endpoint='func12') #done
@jwt_required(optional=True)
def delate_caption():
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()
    elif request.method == 'POST':
        return delete_caption_service()

@caption_bp.route("/add_favorite", methods=["POST", "OPTIONS"], endpoint='func13') #done
@jwt_required(optional=True)
def add_favorite():
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()
    elif request.method == 'POST':
        return add_favorite_service()

@caption_bp.route("/remove_favorite", methods=["POST", "OPTIONS"], endpoint='func14')
@jwt_required(optional=True)
def remove_favorite():
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()
    elif request.method == 'POST':
        return remove_favorite_service()

@caption_bp.route("/edit_content", methods=["PUT", "OPTIONS"], endpoint='func15')  #done
@jwt_required(optional=True)
def edit_content():
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()
    elif request.method == 'PUT':
        return edit_content_service()

@caption_bp.route("/edit_emotion", methods=["PUT", "OPTIONS"], endpoint='func16') #done
@jwt_required(optional=True)
def edit_emotion():
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()
    elif request.method == 'PUT':
        return edit_emotion_service()

@caption_bp.route("/edit_tag_id", methods=["PUT", "OPTIONS"], endpoint='func17') #done
@jwt_required(optional=True)
def edit_tag_id():
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()
    elif request.method == 'PUT':
        return edit_tag_id_service()
