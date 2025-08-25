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

app = Flask(__name__)
CORS(
    app,
    origins=["http://localhost:5173"]
)

app.config["SQLALCHEMY_DATABASE_URI"] = f"postgresql://{username}:{password}@{host}:{port}/{pgdb}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = jwt_secret_key

db = SQLAlchemy(app)
jwt = JWTManager(app)