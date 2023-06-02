from flask import Blueprint, g
from .service_caption import (get_all_captions_admin_service, get_caption_favorite_service, get_des_service, get_emotion_service,
                      get_list_caption_login_service, get_list_caption_no_login_service , get_list_tag_service, get_tag_by_id_service,
                      add_caption_service, delete_caption_service, add_favorite_service, remove_favorite_service, edit_content_service,
                      edit_emotion_service, edit_tag_id_service, add_image_service)

from flask_jwt_extended import jwt_required, get_jwt_identity

caption_bp = Blueprint("caption", __name__, url_prefix="/caption")

@caption_bp.route("/get_all_caption", methods=["GET"], endpoint='func1') #done
def get_all_caption():
    return get_all_captions_admin_service()

@caption_bp.route("/add_image", methods=["POST"], endpoint='func16') #done
@jwt_required(optional=True)
def add_image():
    return add_image_service()

@caption_bp.route("/get_caption_favorite", methods=["GET"], endpoint='func2') #done
@jwt_required(optional=True)
def get_caption_favorite():
    return get_caption_favorite_service()

@caption_bp.route("/get_des", methods=["POST"], endpoint='func3') #done
def get_des():
    return get_des_service()

@caption_bp.route("/get_emotion", methods=["POST"], endpoint='func4') #done
def get_emotion():
    return get_emotion_service()

@caption_bp.route("/get_list_caption_login", methods=["GET"], endpoint='func5') #done
@jwt_required(optional=True)
def get_list_caption_login():
    return get_list_caption_login_service()

@caption_bp.route("/get_list_caption_no_login", methods=["GET"], endpoint='func6') #done
def get_list_caption_no_login():
    return get_list_caption_no_login_service()

@caption_bp.route("/get_list_tag", methods=["GET"], endpoint='func7') #done
@jwt_required(optional=True)
def get_list_tag():
    return get_list_tag_service()

@caption_bp.route("/get_tag_by_id/", methods=["GET"], endpoint='func8') #done
@jwt_required(optional=True)
def get_tag_by_id():
    return get_tag_by_id_service()

@caption_bp.route("/add_caption", methods=["POST"]) #done
@jwt_required(optional=True)
def add_caption():
    return add_caption_service()

@caption_bp.route("/delete_caption", methods=["POST"], endpoint='func10') #done
@jwt_required(optional=True)
def delate_caption():
    return delete_caption_service()

@caption_bp.route("/add_favorite", methods=["POST"], endpoint='func11') #done
@jwt_required(optional=True)
def add_favorite():
    return add_favorite_service()

@caption_bp.route("/remove_favorite", methods=["POST"], endpoint='func12')
@jwt_required(optional=True)
def remove_favorite():
    return remove_favorite_service()

@caption_bp.route("/edit_content", methods=["PUT"], endpoint='func13')  #done
@jwt_required(optional=True)
def edit_content():
    return edit_content_service()

@caption_bp.route("/edit_emotion", methods=["PUT"], endpoint='func14') #done
@jwt_required(optional=True)
def edit_emotion():
    return edit_emotion_service()

@caption_bp.route("/edit_tag_id", methods=["PUT"], endpoint='func15') #done
@jwt_required(optional=True)
def edit_tag_id():
    return edit_tag_id_service()
