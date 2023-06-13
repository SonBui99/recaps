from flask import Blueprint, g, request, make_response, jsonify
from .service_caption import (get_all_captions_admin_service, get_caption_favorite_service, get_des_service, get_emotion_service,
                      get_list_caption_login_service, get_list_caption_no_login_service , get_list_tag_service, get_tag_by_id_service,
                      add_caption_service, delete_caption_service, add_favorite_service, remove_favorite_service, edit_content_service,
                      edit_emotion_service, edit_tag_id_service, add_image_service, get_all_tag_service)

# from flask_jwt_extended import jwt_required
from ..auth import check_user_login

caption_bp = Blueprint("caption", __name__, url_prefix="/caption")

def _build_cors_preflight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "*")
    response.headers.add("Access-Control-Allow-Methods", "*")
    return jsonify(response)

@caption_bp.route("/get_all_caption", methods=["GET", "OPTIONS"], endpoint='func1') #done
#@jwt_required(optional=True)
def get_all_caption():
    user_id = check_user_login(request)
    print("captions")
    if user_id != None:
        if request.method == 'OPTIONS':
            return _build_cors_preflight_response()
        elif request.method == 'GET':
            return get_all_captions_admin_service(user_id)
    else:
        responseObject = {
            'status': 'fail',
            'message': 'Provide a valid auth token.'
        }
        return make_response(jsonify(responseObject)), 403


@caption_bp.route("/get_all_tag", methods=["GET", "OPTIONS"], endpoint='func10') #done
#@jwt_required(optional=True)
def get_all_tag():
    user_id = check_user_login(request)
    print("Tags")
    if user_id != None:
        print(user_id)
        if request.method == 'OPTIONS':
            return _build_cors_preflight_response()
        elif request.method == 'GET':
            return get_all_tag_service(user_id)
    else:
        responseObject = {
            'status': 'fail',
            'message': 'Provide a valid auth token.'
        }
        return make_response(jsonify(responseObject)), 403

@caption_bp.route("/add_image", methods=["POST", "OPTIONS"], endpoint='func2') #done
#@jwt_required(optional=True)
def add_image():
    if check_user_login(request) != None:
        user_id = check_user_login(request)
        if request.method == 'OPTIONS':
            return _build_cors_preflight_response()
        elif request.method == 'POST':
            return add_image_service(user_id)
    else:
        responseObject = {
            'status': 'fail',
            'message': 'Provide a valid auth token.'
        }
        return make_response(jsonify(responseObject)), 403

@caption_bp.route("/get_caption_favorite", methods=["GET", "OPTIONS"], endpoint='func3') #done
#@jwt_required(optional=True)
def get_caption_favorite():
    if check_user_login(request) != None:
        print("Favourite")
        user_id = check_user_login(request)
        if request.method == 'OPTIONS':
            return _build_cors_preflight_response()
        elif request.method == 'GET':
            return get_caption_favorite_service(user_id)
    else:
        responseObject = {
            'status': 'fail',
            'message': 'Provide a valid auth token.'
        }
        return make_response(jsonify(responseObject)), 403

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
#@jwt_required(optional=True)
def get_list_caption_login():
    if check_user_login(request) != None:
        user_id = check_user_login(request)
        # print(user_id)
        if request.method == 'OPTIONS':
            return _build_cors_preflight_response()
        elif request.method == 'POST':
            return get_list_caption_login_service(user_id)
    else:
        responseObject = {
            'status': 'fail',
            'message': 'Provide a valid auth token.'
        }
        return make_response(jsonify(responseObject)), 403
    
@caption_bp.route("/get_list_caption_no_login", methods=["POST", "OPTIONS"], endpoint='func7') #done
def get_list_caption_no_login():
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()
    elif request.method == 'POST':
        return get_list_caption_no_login_service()

@caption_bp.route("/get_list_tag", methods=["GET", "OPTIONS"], endpoint='func8') #done
#@jwt_required(optional=True)
def get_list_tag():
    if check_user_login(request) != None:
        user_id = check_user_login(request)
        if request.method == 'OPTIONS':
            return _build_cors_preflight_response()
        elif request.method == 'GET':
            return get_list_tag_service(user_id)
    else:
        responseObject = {
            'status': 'fail',
            'message': 'Provide a valid auth token.'
        }
        return make_response(jsonify(responseObject)), 403

@caption_bp.route("/get_tag_by_id/", methods=["GET", "OPTIONS"], endpoint='func9') #done
#@jwt_required(optional=True)
def get_tag_by_id():
    if check_user_login(request) != None:
        user_id = check_user_login(request)
        if request.method == 'OPTIONS':
            return _build_cors_preflight_response()
        elif request.method == 'GET':
            return get_tag_by_id_service(user_id)
    else:
        responseObject = {
            'status': 'fail',
            'message': 'Provide a valid auth token.'
        }
        return make_response(jsonify(responseObject)), 403

@caption_bp.route("/add_caption", methods=["POST", "OPTIONS"], endpoint='func11') #done
#@jwt_required(optional=True)
def add_caption():
    if check_user_login(request) != None:
        user_id = check_user_login(request)
        if request.method == 'OPTIONS':
            return _build_cors_preflight_response()
        elif request.method == 'POST':
            return add_caption_service(user_id)
    else:
        responseObject = {
            'status': 'fail',
            'message': 'Provide a valid auth token.'
        }
        return make_response(jsonify(responseObject)), 403

@caption_bp.route("/delete_caption", methods=["POST", "OPTIONS"], endpoint='func12') #done
#@jwt_required(optional=True)
def delete_caption():
    if check_user_login(request) != None:
        user_id = check_user_login(request)
        if request.method == 'OPTIONS':
            return _build_cors_preflight_response()
        elif request.method == 'POST':
            return delete_caption_service(user_id)
    else:
        responseObject = {
            'status': 'fail',
            'message': 'Provide a valid auth token.'
        }
        return make_response(jsonify(responseObject)), 403
    
@caption_bp.route("/add_favorite", methods=["POST", "OPTIONS"], endpoint='func13') #done
#@jwt_required(optional=True)
def add_favorite():
    if check_user_login(request) != None:
        user_id = check_user_login(request)
        if request.method == 'OPTIONS':
            return _build_cors_preflight_response()
        elif request.method == 'POST':
            return add_favorite_service(user_id)
    else:
        responseObject = {
            'status': 'fail',
            'message': 'Provide a valid auth token.'
        }
        return make_response(jsonify(responseObject)), 403

@caption_bp.route("/remove_favorite", methods=["POST", "OPTIONS"], endpoint='func14')
#@jwt_required(optional=True)
def remove_favorite():
    if check_user_login(request) != None:
        user_id = check_user_login(request)
        if request.method == 'OPTIONS':
            return _build_cors_preflight_response()
        elif request.method == 'POST':
            return remove_favorite_service(user_id)
    else:
        responseObject = {
            'status': 'fail',
            'message': 'Provide a valid auth token.'
        }
        return make_response(jsonify(responseObject)), 403

@caption_bp.route("/edit_content", methods=["PUT", "OPTIONS"], endpoint='func15')  #done
#@jwt_required(optional=True)
def edit_content():
    if check_user_login(request) != None:
        user_id = check_user_login(request)
        if request.method == 'OPTIONS':
            return _build_cors_preflight_response()
        elif request.method == 'PUT':
            return edit_content_service(user_id)
    else:
        responseObject = {
            'status': 'fail',
            'message': 'Provide a valid auth token.'
        }
        return make_response(jsonify(responseObject)), 403

@caption_bp.route("/edit_emotion", methods=["PUT", "OPTIONS"], endpoint='func16') #done
#@jwt_required(optional=True)
def edit_emotion():
    if check_user_login(request) != None:
        user_id = check_user_login(request)
        if request.method == 'OPTIONS':
            return _build_cors_preflight_response()
        elif request.method == 'PUT':
            return edit_emotion_service(user_id)
    else:
        responseObject = {
            'status': 'fail',
            'message': 'Provide a valid auth token.'
        }
        return make_response(jsonify(responseObject)), 403

@caption_bp.route("/edit_tag_id", methods=["PUT", "OPTIONS"], endpoint='func17') #done
#@jwt_required(optional=True)
def edit_tag_id():
    if check_user_login(request) != None:
        user_id = check_user_login(request)
        if request.method == 'OPTIONS':
            return _build_cors_preflight_response()
        elif request.method == 'PUT':
            return edit_tag_id_service(user_id)
    else:
        responseObject = {
            'status': 'fail',
            'message': 'Provide a valid auth token.'
        }
        return make_response(jsonify(responseObject)), 403
