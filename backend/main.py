from flask import request, jsonify
from config import app, db
from models import Sim, Relationship, User
import hashlib

# User APIs
@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return(
            jsonify({"message": "Missing username or password"}), 400
        )
    
    hashed_password = hashlib.sha256(password.encode()).hexdigest()

    new_user = User(username=username, password=hashed_password)

    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "New user has been added!"}), 201
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"message": "Missing username or password"}), 400
    
    hashed_password = hashlib.sha256(password.encode()).hexdigest()

    user = User.query.filter_by(username=username).first()
    
    if user and user.password == hashed_password:
        return jsonify({"message": f"Welcome {username}!"}), 200
    else:
        return jsonify({"message": "User not found"}), 404


# Sim APIs
@app.route("/sims", methods=["GET"])
def get_sims():
    sims = Sim.query.all()
    json_sims = list(map(lambda x: x.to_json(), sims))
    return jsonify({"sims": json_sims})

@app.route("/add_sim", methods=["POST"])
def add_sim():
    data = request.json
    first_name = data.get("firstName")
    last_name = data.get("lastName")
    gender = data.get("gender")
    cause_of_death = data.get("causeOfDeath")
    age_of_death = data.get("ageOfDeath")
    professional = data.get("professional")

    if not first_name or not last_name or not gender:
        return (
            jsonify({"message": "You must include a first name, laste name and gender"}), 
            400
        )
    
    new_sim = Sim(first_name=first_name, last_name=last_name, gender=gender, cause_of_death=cause_of_death, age_of_death=age_of_death, professional=professional)
    
    try:
        db.session.add(new_sim)
        db.session.commit()
        return jsonify({"message": "New sim has been added!"}), 201
    except Exception as e:
        return jsonify({"message": str(e)}), 400

@app.route("/sim/<int:sim_id>", methods=["PATCH"])
def update_sim(sim_id):
    sim = Sim.query.get(sim_id)

    if not sim:
        return jsonify({"message": "Sim not found"}), 404
    
    data = request.json
    sim.first_name = data.get("firstName", sim.first_name)
    sim.last_name = data.get("lastName", sim.last_name)
    sim.gender = data.get("gender", sim.gender)
    sim.cause_of_death = data.get("causeOfDeath", sim.cause_of_death)
    sim.age_of_death = data.get("ageOfDeath", sim.age_of_death)
    sim.professional = data.get("professional", sim.professional)

    db.session.commit()

    return jsonify({"message": "Sim updated"}), 200

@app.route("/sim/<int:sim_id>", methods=["DELETE"])
def delete_sim(sim_id):
    sim = Sim.query.get(sim_id)

    if not sim:
        return jsonify({"message": "Sim not found"}), 404
    
    db.session.delete(sim)
    db.session.commit()

    return jsonify({"message": "Sim deleted!"}), 200

# Relationship APIs
@app.route("/sim/<int:sim_id>/relationships", methods=["POST"])
def add_relationship(sim_id):
    sim = Sim.query.get(sim_id)

    if not sim:
        return jsonify({"message": "Sim not found"}), 404
    
    sim_id = sim.id

    data = request.json
    related_to_id = data.get("relatedToId")
    relationship_type = data.get("relationshipType")

    if not related_to_id:
        return jsonify({"message": "You must add both sims' id to relationship"}), 400
    
    new_relationship = Relationship(sim_id=sim_id, related_to_id=related_to_id, relationship_type=relationship_type)
    try:
        db.session.add(new_relationship)
        db.session.commit()    
        return jsonify({"message": "New relationship to sim has been added!"}), 201
    except Exception as e:
        return jsonify({"message": str(e)}), 400

if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)