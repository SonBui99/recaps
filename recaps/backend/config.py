from datetime import timedelta

SECRET_KEY = 'buiducson'

SQLALCHEMY_TRACK_MODIFICATIONS = False

JWT_TOKEN_LOCATION = ["headers", "cookies", "json", "query_string"]

JWT_COOKIE_SECURE = False

JWT_SECRET_KEY = "super-secret-abc"

JWT_COOKIE_CSRF_PROTECT = False

JWT_ACCESS_TOKEN_EXPRIRES = timedelta(hours=12)