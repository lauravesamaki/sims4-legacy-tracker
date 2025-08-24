from config import db
from sqlalchemy import Sequence, ForeignKey, Integer, String, DateTime, Text, ARRAY, Column
from datetime import datetime
from sqlalchemy.orm import relationship

class Sim(db.Model):
    __tablename__ = "sims"
    id = Column(Integer, Sequence("sim_id_seq", start=1), primary_key=True)
    first_name = Column(String(64), nullable=False)
    last_name = Column(String(64), nullable=False)
    gender = Column(String(20), nullable=False)
    occult = Column(String(20))
    cause_of_death = Column(String(64))
    age_of_death = Column(String(20))
    professional = Column(String(64))
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    user = relationship("User", back_populates="sims")

    def to_json(self):
        return {
            "id": self.id,
            "firstName": self.first_name,
            "lastName": self.last_name,
            "gender": self.gender,
            "causeOfDeath": self.cause_of_death,
            "ageOfDeath": self.age_of_death,
            "professional": self.professional,
            "userId": self.user_id
        }
    
class Relationship(db.Model):
    __tablename__ = "relationships"
    id = Column(Integer, Sequence("relationship_id_seq", start=1), primary_key=True)
    sim_id = Column(Integer, ForeignKey("sims.id"), nullable=False)
    related_sim_id = Column(Integer, ForeignKey("sims.id"), nullable=False)
    relationship_type = Column(String(64), nullable=False)

    def to_json(self):
        return {
            "id": self.id,
            "simId": self.sim_id,
            "relatedToId": self.related_sim_id,
            "relationshipType": self.relationship_type
        }

class User(db.Model):
    __tablename__ = "users"
    id = Column(Integer, Sequence("user_id_seq", start=1), primary_key=True)
    username = Column(String(30), unique=True, nullable=False)
    password = Column(Text, nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.today)
    modified_at = Column(DateTime)
    sims = relationship("Sim", back_populates="user")

    def to_json(self):
        return {
            "id": self.id,
            "username": self.username,
            "password": self.password,
            "sims": [sim.id for sim in self.sims],
            "createdAt": self.created_at,
            "modifiedAt": self.modified_at
        }