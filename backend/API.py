from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/")
def hello_world():
  return "<p>Hello, World!</p>"

@app.route("/register", methods=["POST"])
def register():
  data = request.json
  email = data["email"]
  salt = data["salt"]
  verifier = data["verifier"]

  # TODO: Call database function.
  # TODO: If database function succeeds, send 201.

  return "", 201
