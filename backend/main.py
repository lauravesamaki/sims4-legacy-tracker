from flask import request, jsonify
from config import app, db
from models import Sim, Relationship

@app.route("/sims", methods=["GET"])
def get_sims():
    sims = Sim.query.all()
    json_sims = list(map(lambda x: x.to_json(), sims))
    return jsonify({"sims": json_sims})

@app.route("/add_sim", methods=["POST"])
def add_sim():
    first_name = request.json.get("firstName")
    last_name = request.json.get("lastName")
    gender = request.json.get("gender")
    cause_of_death = request.json.get("causeOfDeath")
    age_of_death = request.json.get("ageOfDeath")
    professional = request.json.get("professional")

    if not first_name or not last_name or not gender:
        return (
            jsonify({"message": "You must include a first name, laste name and gender"}), 
            400
        )
    
    new_sim = Sim(first_name=first_name, last_name=last_name, gender=gender, cause_of_death=cause_of_death, age_of_death=age_of_death, professional=professional)
    
    try:
        db.session.add(new_sim)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    
    return jsonify({"message": "New sim has been added!"}), 201

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

@app.route("/sim/<int:sim_id>/relationships", methods=["POST"])
def add_relationship(sim_id):
    sim = Sim.query.get(sim_id)

    if not sim:
        return jsonify({"message": "Sim not found"}), 404
    
    sim_id = sim.id
    related_to_id = request.json.get("relatedToId")
    relationship_type = request.json.get("relationshipType")

    if not related_to_id:
        return jsonify({"message": "You must add both sims' id to relationship"}), 400
    
    new_relationship = Relationship(sim_id=sim_id, related_to_id=related_to_id, relationship_type=relationship_type)
    try:
        db.session.add(new_relationship)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    
    return jsonify({"message": "New relationship to sim has been added!"}), 201

if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)