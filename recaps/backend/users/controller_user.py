from flask import Blueprint
from flask import Flask, request, jsonify, make_response

from flask_jwt_extended import(
    get_current_user,
    get_jwt_identity
)

user_bp = Blueprint("user", __name__, url_prefix="/user")

def _build_cors_preflight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "*")
    response.headers.add("Access-Control-Allow-Methods", "*")
    return response

@user_bp.route("/register", methods=["POST", "OPTIONS"])
def register_user():
    from .service_user import register_user_service 
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()
    elif request.method == 'POST':
        return register_user_service()

@user_bp.route("/login_user", methods=["POST", "OPTIONS"])
def login_user():
    from .service_user import login_user_service
    # print(request)
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()
    elif request.method == 'POST':
        return login_user_service()

@user_bp.route("/logout", methods=['GET'])
def logout_user():
    from .service_user import log_out_service
    return log_out_service()