from http import client
import json
import os

from flask import Flask, jsonify, request, Response
from flask_pymongo import PyMongo
from pymongo import MongoClient
from flask_swagger_ui import get_swaggerui_blueprint
from flask_cors import CORS  # Import CORS
from bson import ObjectId  # Import ObjectId for MongoDB


# Init flask app
app = Flask(__name__)
# Init swagger
SWAGGER_URL = "/swagger"
API_URL = "/static/swagger.json"
swagger_ui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={
        'app_name': 'Eshop API'
    }
)
app.register_blueprint(swagger_ui_blueprint, url_prefix=SWAGGER_URL)
CORS(app)
app.config["MONGO_URI"] = "mongodb+srv://poirotyourdad:6KuWTADXrqLHwoEg@cluster0.tjww1fn.mongodb.net/eshop?retryWrites=true&w=majority"
client = MongoClient(app.config["MONGO_URI"])
db = client["eshop"]
products_collection = db["products"]

@app.route("/products/search", methods=["GET"])
def search_products():
    query = request.args.get("query")
    if not query:
        query = ""

    # Perform a case-insensitive search in the database
    products = list(products_collection.find({"name": {"$regex": query, "$options": "i"}}))

    # Convert ObjectId to string for JSON serialization
    for product in products:
        product["_id"] = str(product["_id"])

    return jsonify(products), 200

@app.route("/products/likes", methods=["POST"])
def add_like():
    data = request.get_json()
    if not data or "product_id" not in data:
        return jsonify({"error": "Product ID is required"}), 400

    try:
        product_id = ObjectId(data["product_id"])  # Convert product_id to ObjectId
    except Exception:
        return jsonify({"error": "Invalid Product ID format"}), 400

    result = products_collection.update_one(
        {"_id": product_id},
        {"$inc": {"likes": 1}}
    )

    if result.matched_count == 0:
        return jsonify({"error": "Product not found"}), 404

    return jsonify({"message": "Like added successfully"}), 200

@app.route("/products/popular-products", methods=["GET"])
def get_popular_products():
    # Fetch products sorted by likes in descending order
    popular_products = list(products_collection.find().sort("likes", -1).limit(5))

    # Convert ObjectId to string for JSON serialization
    for product in popular_products:
        product["_id"] = str(product["_id"])

    return jsonify(popular_products), 200
@app.route("/users/register", methods=["POST"])
def register_user():
    data = request.get_json()
    if not data or "username" not in data or "password" not in data:
        return jsonify({"error": "Username and password are required"}), 400

    username = data["username"]
    password = data["password"]

    # Check if the username already exists
    if db["users"].find_one({"username": username}):
        return jsonify({"error": "Username already exists"}), 400

    # Insert the new user into the users collection
    result = db["users"].insert_one({
        "username": username,
        "password": password
    })

    return jsonify({"message": "User registered successfully", "user_id": str(result.inserted_id)}), 201


@app.route("/users/login", methods=["POST"])
def login_user():
    data = request.get_json()
    if not data or "username" not in data or "password" not in data:
        return jsonify({"error": "Username and password are required"}), 400

    username = data["username"]
    password = data["password"]

    # Check if the user exists and the password matches
    user = db["users"].find_one({"username": username, "password": password})
    if not user:
        return jsonify({"error": "Invalid username or password"}), 401

    return jsonify({"message": "Login successful", "user_id": str(user["_id"])}), 200



if __name__ == "__main__":
    app.run(debug=True,host="127.0.0.1",port=5000)
