from config import db
from sqlalchemy import Sequence, ForeignKey, Integer, String, DateTime, Text
from datetime import datetime

class Sim(db.Model):
    id = db.Column(Integer, Sequence("sim_id_seq", start=1), primary_key=True)
    first_name = db.Column(String(64), nullable=False)
    last_name = db.Column(String(64), nullable=False)
    gender = db.Column(String(20), nullable=False)
    cause_of_death = db.Column(String(64))
    age_of_death = db.Column(String(20))
    professional = db.Column(String(64))

    def to_json(self):
        return {
            "id": self.id,
            "firstName": self.first_name,
            "lastName": self.last_name,
            "gender": self.gender,
            "causeOfDeath": self.cause_of_death,
            "ageOfDeath": self.age_of_death,
            "professional": self.professional
        }
    
class Relationship(db.Model):
    id = db.Column(Integer, Sequence("relationship_id_seq", start=1), primary_key=True)
    sim_id = db.Column(Integer, ForeignKey("sim.id"), nullable=False)
    related_sim_id = db.Column(Integer, ForeignKey("sim.id"), nullable=False)
    relationship_type = db.Column(String(64), nullable=False)

    def to_json(self):
        return {
            "id": self.id,
            "simId": self.sim_id,
            "relatedToId": self.related_sim_id,
            "relationshipType": self.relationship_type
        }

class User(db.Model):
    id = db.Column(Integer, Sequence("user_id_seq", start=1), primary_key=True)
    username = db.Column(String(30), unique=True, nullable=False)
    password = db.Column(Text, nullable=False)
    created_at = db.Column(DateTime, nullable=False, default=datetime.today)
    modified_at = db.Column(DateTime)

    def to_json(self):
        return {
            "id": self.id,
            "username": self.username,
            "password": self.password,
            "createdAt": self.created_at,
            "modifiedAt": self.modified_at
        }