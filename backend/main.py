from flask import request, jsonify, make_response, redirect
from config import app, db, jwt
from models import Sim, Relationship, User, FamilyTree
from flask_bcrypt import Bcrypt
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    get_jwt_identity,
    get_jwt,
    jwt_required,
    set_access_cookies,
    set_refresh_cookies,
    unset_jwt_cookies,
    unset_access_cookies,
    get_csrf_token)
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
        access_token = create_access_token(identity=str(new_user.id),fresh=True)
        csrf = get_csrf_token(access_token)
        return jsonify({"addedUser": True, "user": username, "csrf": csrf}), 201
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
        access_token = create_access_token(identity=str(user.id), fresh=True)
        refresh_token = create_refresh_token(user.id)
        csrf = get_csrf_token(access_token)

        res = jsonify({'login': True, 'user': username, 'csrf': csrf})
        res.headers['csrf_access_token'] = get_csrf_token(access_token)
        res.headers['csrf_refresh_token'] = get_csrf_token(refresh_token)
        set_access_cookies(res, access_token)
        set_refresh_cookies(res, refresh_token)
        #return jsonify({"access_token": access_token, "refresh_tone": refresh_token}), 200
        return res, 200
    else:
        return jsonify({"message": "User not found"}), 404
    
@app.route("/refresh", methods=["GET"])
@jwt_required(refresh=True, locations=["cookies"])
def refresh():
    current_user = get_jwt_identity()
    new_token = create_access_token(identity=str(current_user), fresh=True)
    csrf = get_csrf_token(new_token)
    res = jsonify({"message": "Done", "csrf": csrf})
    set_access_cookies(res, new_token)
    return res

@jwt.expired_token_loader
def expired_token_callback(jwt_headers, jwt_payload):
    res = jsonify({"message": "Token expired"})
    return res, 302

@app.route("/token/remove", methods=["POST"])
def logout():
    res = jsonify({"logout": True})
    unset_jwt_cookies(res)
    return res, 200

@app.route("/auth-check", methods=["GET"])
@jwt_required(locations=["cookies"])
def auth_check():
    user_id = get_jwt_identity()
    return jsonify({"logged_id": True, "user": user_id}), 200

@app.route("/csrf-token", methods=["GET"])
@jwt_required(locations=["cookies"])
def get_csrf():
    token = get_jwt()
    csrf = token["csrf"]
    return jsonify({"token": csrf})

@app.route("/user/<username>/sims", methods=["GET"])
@jwt_required(fresh=True, locations=["cookies"])
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
@jwt_required(fresh=True, locations=["cookies"])
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
@app.route("/user/<username>/sims", methods=["GET"])
@jwt_required(fresh=True, locations=["cookies"])
def get_sims(username):
    user = db.session.scalars(select(User).where(User.username == username)).first()
    sims = db.session.scalars(select(Sim).where(Sim.user_id == user.id))
    
    json_sims = list(map(lambda x: x.to_json(), sims))
    return jsonify({"sims": json_sims})

@app.route("/user/<username>/add_sim", methods=["POST"])
@jwt_required(fresh=True, locations=["cookies"])
def add_sim(username):
    data = request.get_json()
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
        return jsonify({"message": "User not found"}), 404

    user_id = user.id

    if not first_name or not last_name or not gender:
        return (
            jsonify({"message": "You must include a first name, last name and gender"}), 
            400
        )
    
    new_sim = Sim(first_name=first_name, last_name=last_name, gender=gender, occult=occult, cause_of_death=cause_of_death, age_of_death=age_of_death, occupation=occupation, user_id=user_id)

    try:
        db.session.add(new_sim)
        db.session.commit()
        sim = new_sim.to_json()
        return jsonify({"message": "New sim has been added!", "sim": sim}), 201
    except Exception as e:
        return jsonify({"message": str(e)}), 400

@app.route("/sim/<int:sim_id>", methods=["PATCH"])
@jwt_required(fresh=True, locations=["cookies"])
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
@jwt_required(fresh=True, locations=["cookies"])
def delete_sim(sim_id):
    sim = db.session.scalars(select(Sim).where(Sim.id == sim_id)).first()
    #Sim.query.get(sim_id)

    if not sim:
        return jsonify({"message": "Sim not found"}), 404
    
    db.session.delete(sim)
    db.session.commit()

    return jsonify({"message": "Sim deleted!"}), 200

# Relationship routes
RELATIONSHIP_MAP = {
    "parent": "child",
    "child": "parent",
    "spouse": "spouse",
    "sibling" :"sibling",
    "uncle": "niece/nephew",
    "aunt": "niece/nephew",
    "niece": "uncle/aunt",
    "nephew": "uncle/aunt",
    "grandparent": "grandchild",
    "grandchild": "grandparent"
}

@app.route("/sim/<int:sim_id>", methods=["GET"])
@jwt_required(fresh=True, locations=["cookies"])
def get_relationships(sim_id):
    sim = db.session.scalars(select(Sim).where(Sim.id == sim_id)).first()

    if not sim:
        return jsonify({"message": "Sim not found"}), 404
    
    relationships = db.session.scalars(select(Relationship).where(Relationship.sim_id == sim.id))
    json_relationships = list(map(lambda x: x.to_json(), relationships))
    return jsonify({"relationships": json_relationships})

@app.route("/relationships/add", methods=["POST"])
@jwt_required(fresh=True, locations=["cookies"])
def add_relationship():    
    data = request.json
    sim_id = data.get("simId")
    related_to_id = data.get("relatedToId")
    relationship_type = data.get("relationshipType")

    sim = db.session.scalars(select(Sim).where(Sim.id == sim_id)).first()

    if not sim:
        return jsonify({"message": "Sim not found"}), 404

    inverse_type = RELATIONSHIP_MAP.get(relationship_type)

    if not related_to_id:
        return jsonify({"message": "You must add both sims' id to relationship"}), 400
    
    existing = db.session.scalars(select(Relationship).where(Relationship.sim_id == sim_id and Relationship.related_sim_id == related_to_id and Relationship.relationship_type == relationship_type)).first()
    
    if existing:
        return existing

    r1 = Relationship(sim_id=sim_id, related_sim_id=related_to_id, relationship_type=relationship_type)
    r2 = Relationship(sim_id=related_to_id, related_sim_id=sim_id, relationship_type=inverse_type)
    
    try:
        db.session.add_all([r1, r2])
        db.session.commit()    
        return jsonify({"message": "New relationship to sim has been added!"}), 201
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    
@app.route("/relationships/<int:relationship_id>", methods=["DELETE"])
@jwt_required(fresh=True, locations=["cookies"])
def delete_relationship(relationship_id):
    relationship = db.session.scalars(select(Relationship).where(Relationship.id == relationship_id)).first()

    if not relationship:
        return jsonify({"message": "Relationship not found"}), 404
    
    relationship2 = db.session.scalars(select(Relationship).where(
        Relationship.sim_id == relationship.related_sim_id &
        Relationship.related_sim_id == relationship.sim_id
    ))

    if not relationship2:
        return jsonify({"message": "Couldn't find matching relationship"}), 404
    
    db.session.delete(relationship)
    db.session.delete(relationship2)
    db.session.commit()

    return jsonify({"message": "Relationships succesfully deleted!"}), 200

@app.route("/relationships/<int:relationship_id>/edit", methods=["PATCH"])
@jwt_required(fresh=True, locations=["cookies"])
def edit_relationship(relationship_id):
    relationship = db.session.scalars(select(Relationship).where(Relationship.id == relationship_id)).first()

    if not relationship:
        return jsonify({"message": "Relationship not found"}), 404
    
    data = request.json
    relationship.sim_id = data.get("sim_id", relationship.sim_id)
    relationship.related_sim_id = data.get("related_sim_id", relationship.related_sim_id)
    relationship.relationship_type = data.get("relationship_type", relationship.relationship_type)

    db.session.commit()

    return jsonify({"message": "Relationship updated"}), 200

# Familytree routes
@app.route("/user/<username>/trees", methods=["GET"])
@jwt_required(fresh=True, locations=["cookies"])
def get_trees(username):
    user = db.session.scalars(select(User).where(User.username == username)).first()

    if not user:
        return jsonify({"message": "user not found"}), 404
    
    trees = db.session.scalars(select(FamilyTree).where(FamilyTree.user_id == user.id))

    trees_json = list(map(lambda x: x.to_json(), trees))

    return jsonify({"trees": trees_json}), 200

@app.route("/trees/add", methods=["POST"])
@jwt_required(fresh=True, locations=["cookies"])
def add_tree():
    data = request.json
    name = data.get("name")
    user_id = data.get("userId")
    sim_ids = data.get("sims", [])

    user = db.session.scalars(select(User).where(User.id == user_id)).first()

    if not user:
        return (
            jsonify({"message": "You cannot add sim!"}), 400)

    if not name:
        return (
            jsonify({"message": "You must include name"}), 400)

    sims = db.session.scalars(select(Sim).where(Sim.id.in_(sim_ids))).all()

    new_tree = FamilyTree(name=name, user_id=user_id)
    new_tree.sims = sims

    try:
        db.session.add(new_tree)
        db.session.commit()
        tree = new_tree.to_json()
        return jsonify({
            "message": "New tree has been created!", 
            "tree": tree}), 201
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    
@app.route("/trees/<int:tree_id>/edit", methods=["PATCH"])
@jwt_required(fresh=True, locations=["cookies"])
def edit_tree(tree_id):
    tree = db.session.scalars(select(FamilyTree).where(FamilyTree.id == tree_id)).first()

    if not tree:
        return(
            jsonify({"message": "Tree not found"}), 404
        )
    
    data = request.json
    sim_ids = data.get("sims", [])
    sims = db.session.scalars(select(Sim).where(Sim.id.in_(sim_ids))).all()
    
    tree.name = data.get("name", tree.name)
    if sims and tree.sims != sims:
        tree.sims = sims
    else:
        tree.sims = tree.sims

    db.session.commit()

    return jsonify({"message": "Tree has been edited!"}), 200

@app.route("/trees/<int:tree_id>", methods=["DELETE"])
@jwt_required(fresh=True, locations=["cookies"])
def delete_tree(tree_id):
    tree = db.session.scalars(select(FamilyTree).where(FamilyTree.id == tree_id)).first()

    if not tree:
        return jsonify({"message": "Tree not found"}), 404
    
    db.session.delete(tree)
    db.commit()

    return jsonify({"message": "Tree deleted succesfully!"}), 200

if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)