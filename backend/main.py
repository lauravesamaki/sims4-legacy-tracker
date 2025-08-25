from flask import request, jsonify
from config import app, db
from models import Sim, Relationship, User
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token
from sqlalchemy import select

bcrypt = Bcrypt(app)

# User routes
@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return(
            jsonify({"message": "Missing username or password"}), 400
        )
    
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    new_user = User(username=username, password=hashed_password)

    try:
        db.session.add(new_user)
        db.session.commit()
        access_token = create_access_token(identity=username)
        return jsonify({"message": "New user has been added!", "access_token": access_token, "user": new_user.username}), 201
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"message": "Missing username or password"}), 400

    user = db.session.scalars(select(User).where(User.username == username)).first()
    
    if user and bcrypt.check_password_hash(user.password, password):
        access_token = create_access_token(identity=username)
        return jsonify({"access_token": access_token, "user": user.username}), 200
    else:
        return jsonify({"message": "User not found"}), 404

@app.route("/user/<username>/sims", methods=["GET"])
def get_user(username):
    user = db.session.scalars(select(User).where(User.username == username)).first()
    #User.query.filter_by(username=username).first()

    if not user:
        return jsonify({"message": "User not found"}), 404
    
    id = user.id
    sims = db.session.scalars(select(Sim).where(Sim.user_id == id))
    #Sim.query.filter_by(user_id=id)
    json_sims = list(map(lambda x: x.to_json(), sims))
    return jsonify({"sims": json_sims})

@app.route("/user/<int:user_id>", methods=["PATCH"])
def update_user(user_id):
    bcrypt = Bcrypt(app)
    user = db.session.scalars(select(User).where(User.id == user_id)).first()
    #User.query.get(user_id)

    if not user:
        return jsonify({"message": "User not found"}), 404
    
    data = request.json
    password = data.get("password")

    # Hash password if it's given
    if password:
        hashed_password = bcrypt.generate_password_hash(password)
    else:
        hashed_password = None

    user.username = data.get("username", user.username)
    user.password = hashed_password or user.password

    db.session.commit()

    return jsonify({"message": "User succesfully updated"}), 200

# Sim routes
@app.route("/sims", methods=["GET"])
def get_sims():
    sims = db.session.scalars(select(Sim))
    json_sims = list(map(lambda x: x.to_json(), sims))
    return jsonify({"sims": json_sims})

@app.route("/user/<username>/add_sim", methods=["POST"])
def add_sim(username):
    data = request.json
    first_name = data.get("firstName")
    last_name = data.get("lastName")
    gender = data.get("gender")
    occult = data.get("occult")
    cause_of_death = data.get("causeOfDeath")
    age_of_death = data.get("ageOfDeath")
    occupation = data.get("occupation")

    if occult == "":
        occult = 1

    user = db.session.scalars(select(User).where(User.username == username)).first()


    if not user:
        jsonify({"message": "You cannot add sim!"}), 400

    user_id = user.id

    if not first_name or not last_name or not gender:
        return (
            jsonify({"message": "You must include a first name, last name and gender"}), 
            400
        )
    
    new_sim = Sim(first_name=first_name, last_name=last_name, gender=gender, occult=occult, cause_of_death=cause_of_death, age_of_death=age_of_death, occupation=occupation, user_id=user_id)
    

    if not user:
        return jsonify({"message": "User not found"}), 404
    
    # add new sim to user's list of sims

    try:
        db.session.add(new_sim)
        db.session.commit()
        return jsonify({"message": "New sim has been added!"}), 201
    except Exception as e:
        return jsonify({"message": str(e)}), 400

@app.route("/sim/<int:sim_id>", methods=["PATCH"])
def update_sim(sim_id):
    sim = db.session.scalars(select(Sim).where(Sim.id == sim_id)).first()
    #Sim.query.get(sim_id)

    if not sim:
        return jsonify({"message": "Sim not found"}), 404
    
    data = request.json
    sim.first_name = data.get("firstName", sim.first_name)
    sim.last_name = data.get("lastName", sim.last_name)
    sim.gender = data.get("gender", sim.gender)
    sim.occult = data.get("occult", sim.occult)
    sim.cause_of_death = data.get("causeOfDeath", sim.cause_of_death)
    sim.age_of_death = data.get("ageOfDeath", sim.age_of_death)
    sim.occupation = data.get("occupation", sim.occupation)

    db.session.commit()

    return jsonify({"message": "Sim updated"}), 200

@app.route("/sim/<int:sim_id>", methods=["DELETE"])
def delete_sim(sim_id):
    sim = db.session.scalars(select(Sim).where(Sim.id == sim_id)).first()
    #Sim.query.get(sim_id)

    if not sim:
        return jsonify({"message": "Sim not found"}), 404
    
    db.session.delete(sim)
    db.session.commit()

    return jsonify({"message": "Sim deleted!"}), 200

# Relationship routes
@app.route("/sim/<int:sim_id>/relationships", methods=["POST"])
def add_relationship(sim_id):
    sim = db.session.scalars(select(Sim).where(Sim.id == sim_id)).first()
    #Sim.query.get(sim_id)

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