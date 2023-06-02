from backend.model import User
from flask import request, g, jsonify, render_template, redirect, url_for
from flask_jwt_extended import (
    create_access_token,
    set_access_cookies,
    unset_jwt_cookies,
    JWTManager
)
import requests
import json

def register_user_service():
    if request.method == "POST":
        username = request.json["username"]
        email = request.json["email"]
        password = request.json["password"]
        response = None
        
        if response is None:
            user = g.dbsession.query(User).filter_by(email=email).first()
            if user:
                response = "Username is already exist"
            else:
                try:
                    newUser = User(username=username, email=email, password=password)
                    g.dbsession.add(newUser)
                    g.dbsession.commit()
                    g.dbsession.close()
                    data = {'username':username, 'email': email, 'password': password}
                    # data = {'email': email, 'password': password}
                    headers = {'Content-Type': 'application/json'}
                    response = requests.post('http://127.0.0.1:5000/user/login', headers=headers, data=json.dumps(data))
                    if response.status_code == 200:
                        # Nếu đăng nhập thành công, chuyển hướng đến trang chính
                        return redirect(url_for('auth.index', _external=True))
                        # return data
                    else:
                    #     # Nếu đăng nhập thất bại, trả về lỗi
                        return {'error': 'Đăng nhập thất bại'}
                except IndentationError:
                    response = "Cannot register"

        return response
    
def login_user_service():
    from flask import make_response
    if request.method == "POST":
        email = request.json["email"]
        password = request.json["password"]
        response = None

        if email and password:
            user = g.dbsession.query(User).filter_by(email=email).first()
            if user is None or str(user.password) != str(password):
                response = "Incorrect username or password"
            else:
                try:
                    data = {'userid': user.id, 'email': email, 'password': password}
                    access_token = create_access_token(identity=data)
                    response = make_response("Success")
                    set_access_cookies(response, access_token)

                    return jsonify({'access_token': access_token}), 200
                except IndentationError:
                    response = "Cannot login"

        return response
    else:
        return print("Method error")
    
def log_out_service():
    response = redirect(url_for("auth.index"))
    unset_jwt_cookies(response)
    return response