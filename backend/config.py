from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy import create_engine
import os
from dotenv import load_dotenv, dotenv_values
from flask_jwt_extended import JWTManager

load_dotenv()

#postgres
username = os.getenv("PGUSER")
password = os.getenv("PGPASSWORD")
port = os.getenv("PGPORT")
host = os.getenv("PGHOST")
pgdb = os.getenv("PGDATABASE")
jwt_secret_key = os.getenv("JWT_SECRET_KEY")
jwt_refresh_path = os.getenv("JWT_REFRESH_COOKIE_PATH")

app = Flask(__name__)
CORS(
    app,
    resources={r"/*": {"origins": "*"}},
    supports_credentials=True
)

app.config["SQLALCHEMY_DATABASE_URI"] = f"postgresql://{username}:{password}@{host}:{port}/{pgdb}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = jwt_secret_key
app.config["JWT_REFRESH_COOKIE_PATH"] = jwt_refresh_path
app.config["JWT_ACCESS_COOKIE_PATH"] = "/" 
app.config["JWT_COOKIE_SAMESITE"] = "None"
app.config["JWT_COOKIE_SECURE"] = True
app.config["BASE_URL"] = 'http://localhost:5000'
app.config["JWT_COOKIE_CSRF_PROTECT"] = True 

db = SQLAlchemy(app)
jwt = JWTManager(app)