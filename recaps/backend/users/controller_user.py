from flask import Blueprint
#from .service_user import register_user_service, log_out_service, login_user_service

user_bp = Blueprint("user", __name__, url_prefix="/user")

@user_bp.route("/register", methods=["POST"])
def register_user():
    from .service_user import register_user_service
    return register_user_service()

@user_bp.route("/login", methods=["POST"])
def login_user():
    from .service_user import login_user_service
    return login_user_service()

@user_bp.route("/logout", methods=['GET'])
def logout_user():
    from .service_user import log_out_service
    return log_out_service()