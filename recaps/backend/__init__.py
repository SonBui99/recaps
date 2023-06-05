from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS

def create_app(config_file="config.py"):
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
    jwt = JWTManager(app)
    app.config.from_pyfile(config_file)

    from .caption.controller_caption import caption_bp

    app.register_blueprint(caption_bp)

    from .users.controller_user import user_bp

    app.register_blueprint(user_bp)

    from .auth import bp

    app.register_blueprint(bp)

    @jwt.user_identity_loader

    def user_identity_lookup(username):
        return username
    
    return app