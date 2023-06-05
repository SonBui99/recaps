from backend.model import User
from flask import request, g, jsonify, render_template, redirect, url_for
from flask_jwt_extended import (
    create_access_token,
    set_access_cookies,
    unset_jwt_cookies,
    JWTManager,
    get_jwt_identity,
    verify_jwt_in_request
)
import requests
import json

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

engine = create_engine("mariadb+mariadbconnector://root:123456789@127.0.0.1:3307/restapidb")
# engine = create_engine("mariadb+mariadbconnector://root:123456789@127.0.0.1:3307/restapidb")

Session = sessionmaker(bind=engine)
session = Session()

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
                    session.close()
                    # data = {'username':username, 'email': email, 'password': password}
                    # headers = {'Content-Type': 'application/json'}
                    # response = requests.post('http://127.0.0.1:5000/user/login', headers=headers, data=json.dumps(data))
                    # if response.status_code == 200:
                    #     return redirect(url_for('auth.index', _external=True))
                    # else:
                    # #     # Nếu đăng nhập thất bại, trả về lỗi
                    #     response = jsonify({'message': 'User registered successfully'})
                    #     response.status_code = 401
                    #     return response
                    return jsonify({"message":"Done"}), 200
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
                data = {'userid': user.id, 'email': email, 'password': password}
                access_token = create_access_token(identity=data)
                response = make_response("Success")
                set_access_cookies(response, access_token)
                g.user = session.query(User).filter_by(email=email).one()
                return jsonify({'access_token': access_token}), 200
            except IndentationError:
                response = "Cannot login"

    return jsonify({"message":response}), 500
    
def log_out_service():
    response = redirect(url_for("auth.index"))
    unset_jwt_cookies(response)
    return response