from backend.model import User
from flask import request, g, jsonify, render_template, redirect, url_for, make_response
# from flask_jwt_extended import (
#     create_access_token,
#     set_access_cookies,
#     unset_jwt_cookies,
#     JWTManager,
#     get_jwt_identity,
#     verify_jwt_in_request
# )
# import requests
# import json

# from sqlalchemy import create_engine
# from sqlalchemy.orm import sessionmaker

from ..model import session
# engine = create_engine("mariadb+mariadbconnector://root:12345678@127.0.0.1:3307/restapidb")
# engine = create_engine("mariadb+mariadbconnector://root:12345678@127.0.0.1:3307/restapidb")

# Session = sessionmaker(bind=engine)
# session = Session()

def register_user_service():
    if request.method == "POST":
        username = request.json["username"]
        email = request.json["email"]
        password = request.json["password"]
        response = None
        
        if response is None:
            user = session.query(User).filter_by(email=email).first()
            if user:
                response = jsonify({'message': "Username is already exist"}) 
            else:
                try:
                    newUser = User(username=username, email=email, password=password)
                    session.add(newUser)
                    session.commit()
                    auth_token = newUser.encode_auth_token(newUser.id)
                    responseObject = {
                        'status': 'success',
                        'message': 'Successfully registered.',
                        'auth_token': auth_token,
                        'user_name': username
                    }
                    session.close()

                    return make_response(jsonify(responseObject)), 201
                except IndentationError:
                    response = jsonify({'message': "Cannot register"}) 
        response.status_code = 400
        return response
    else:
        return jsonify({"message":"method error"}), 500
    
def login_user_service():
    from flask import make_response
    email = request.json["email"]
    password = request.json["password"]
    response = None
    # print(email)
    if email and password:
        user = session.query(User).filter_by(email=email).first()
        if user is None or str(user.password) != str(password):
            response = "Incorrect username or password"
        else:
            try:
                auth_token = user.encode_auth_token(user.id)
                # print(auth_token)
                if auth_token:
                    responseObject = {
                        'status': 'success',
                        'message': 'Successfully logged in.',
                        'auth_token': auth_token,
                        'user_name': user.username
                    }
                    return make_response(jsonify(responseObject)), 200
            except Exception as e:
                print(e)
                responseObject = {
                    'status': 'fail',
                    'message': 'Try again'
                }
                return make_response(jsonify(responseObject)), 500

    return jsonify({"message":response}), 500
    
def log_out_service():
    from ..model import BlacklistToken
    auth_header = request.headers.get('Authorization')
    if auth_header:
        auth_token = auth_header.split(" ")[1]
    else:
        auth_token = ''
    if auth_token:
        resp = User.decode_auth_token(auth_token)
        if not isinstance(resp, str):
            # mark the token as blacklisted
            blacklist_token = BlacklistToken(token=auth_token)
            try:
                # insert the token
                session.add(blacklist_token)
                session.commit()
                responseObject = {
                    'status': 'success',
                    'message': 'Successfully logged out.'
                }
                return make_response(jsonify(responseObject)), 200
            except Exception as e:
                responseObject = {
                    'status': 'fail',
                    'message': e
                }
                return make_response(jsonify(responseObject)), 200
        else:
            responseObject = {
                'status': 'fail',
                'message': resp
            }
            return make_response(jsonify(responseObject)), 401
    else:
        responseObject = {
            'status': 'fail',
            'message': 'Provide a valid auth token.'
        }
        return make_response(jsonify(responseObject)), 403