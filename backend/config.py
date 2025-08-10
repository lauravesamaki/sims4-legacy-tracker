from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy import create_engine
import os
from dotenv import load_dotenv, dotenv_values

load_dotenv()

#postgres
username = os.getenv("PGUSER")
password = os.getenv("PGPASSWORD")
port = os.getenv("PGPORT")
host = os.getenv("PGHOST")
pgdb = os.getenv("PGDATABASE")

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = f"postgresql://{username}:{password}@{host}:{port}/{pgdb}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)