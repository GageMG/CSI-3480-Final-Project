from flask import Flask, request, jsonify
from Func import db_get_salt, db_create_user, db_delete_user, db_create_item, db_delete_item, db_get_all_user_items, db_login_user

app = Flask(__name__)

@app.route("/")
def hello_world():
  return "<p>Hello, World!</p>"

@app.route("/get-salt", methods=["GET"])
def get_salt():
  email = request.args.get("email")
  salt = db_get_salt(email)

  return jsonify({ "salt": salt }), 401 if salt == "" else 200

@app.route("/register", methods=["POST"])
def register():
  data = request.json
  email = data["email"]
  salt = data["salt"]
  verifier = data["verifier"]

  success = db_create_user(email, salt, verifier)
  if success:
      return "", 201
  return "", 400

@app.route("/login", methods=["POST"])
def login():
  data = request.json
  email = data["email"]
  verifier = data["verifier"]

  # TODO: Check if login is valid.
  guid = db_login_user(email, verifier)
  if guid is None:
     return jsonify({"error": "invalid login"}), 403

  return jsonify({"guid": guid}), 200

@app.route("/delete-user", methods=["DELETE"])
def delete_user_route(guid):
  success = db_delete_user(guid)
  if success:
    return "", 203
  return "", 403

@app.route("/create-item", methods=["POST"])
def create_item_route():
  data = request.json
  item = data["item"]
  user_guid = item["user_guid"]
  name = item["name"]
  username = item["username"]
  password = item["password"]

  success = db_create_item(user_guid, name, username, password)
  if success:
      return "", 201
  return "", 404

@app.route("/delete-item", methods=["DELETE"])
def delete_item_route(item_guid):
  success = db_delete_item(item_guid)

  if success:
      return "", 203
  return "", 403

@app.route("/get-user-items", methods=["GET"])
def get_user_items_route():
   items = db_get_all_user_items(user_guid)

   if items is None:
      return jsonify({"error": "could not retrieve items"}), 505
   
   return jsonify({"items": items}), 200