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

@app.route('/products/<product_id>', methods=['GET'])
def get_product(product_id):
    try:
        # Βρες το προϊόν με βάση το ObjectId
        product = products_collection.find_one({"_id": ObjectId(product_id)})
        if not product:
            return jsonify({"error": "Product not found"}), 404

        # Μετατροπή ObjectId σε string
        product['_id'] = str(product['_id'])

        return jsonify(product), 200
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": "Invalid product ID"}), 400


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

@app.route("/users/likes", methods=["POST"])
def toggle_like():
    data = request.get_json()
    user_id = data.get("user_id")
    product_id = data.get("product_id")

    if not user_id or not product_id:
        return jsonify({"error": "user_id and product_id required"}), 400

    try:
        user_obj_id = ObjectId(user_id)
        product_obj_id = ObjectId(product_id)
    except Exception:
        return jsonify({"error": "Invalid ID format"}), 400

    user = db["users"].find_one({"_id": user_obj_id})
    if not user:
        return jsonify({"error": "User not found"}), 404

    # Αν υπάρχει ήδη, κάνε unlike
    if product_id in user.get("likes", []):
        db["users"].update_one(
            {"_id": user_obj_id},
            {"$pull": {"likes": product_id}}
        )
        db["products"].update_one(
            {"_id": product_obj_id},
            {"$inc": {"likes": -1}}
        )
        return jsonify({"message": "Product unliked"}), 200
    else:
        db["users"].update_one(
            {"_id": user_obj_id},
            {"$addToSet": {"likes": product_id}}
        )
        db["products"].update_one(
            {"_id": product_obj_id},
            {"$inc": {"likes": 1}}
        )
        return jsonify({"message": "Product liked"}), 200

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
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"error": "Username and password required"}), 400

    user = db["users"].find_one({"username": username})
    if not user or user.get("password") != password:
        return jsonify({"error": "Invalid credentials"}), 401

    # Μετατροπή όλων των ObjectId σε string, π.χ. και στο cart αν έχει
    user["_id"] = str(user["_id"])
    if "cart" in user:
        user["cart"] = [str(pid) for pid in user["cart"]]

    return jsonify({"message": "Login successful", "user": user}), 200


@app.route("/users/cart", methods=["POST"])
def add_to_cart():
    data = request.get_json()
    if not data or "user_id" not in data or "product_id" not in data:
        return jsonify({"error": "User ID and Product ID are required"}), 400

    try:
        user_id = ObjectId(data["user_id"])
        product_id = ObjectId(data["product_id"])
    except:
        return jsonify({"error": "Invalid ID format"}), 400

    user = db["users"].find_one({"_id": user_id})
    if not user:
        return jsonify({"error": "User not found"}), 404

    product = products_collection.find_one({"_id": product_id})
    if not product:
        return jsonify({"error": "Product not found"}), 404

    # Προετοίμασε cart entry
    cart_entry = {"product_id": product_id}

    # Δες αν υπάρχει ήδη το προϊόν στο καλάθι
    existing_item = next((item for item in user.get("cart", []) if item["product_id"] == product_id), None)

    if existing_item:
        # Αν υπάρχει, αύξησε την ποσότητα
        db["users"].update_one(
            {"_id": user_id, "cart.product_id": product_id},
            {"$inc": {"cart.$.quantity": 1}}
        )
    else:
        # Αν όχι, πρόσθεσέ το με quantity 1
        cart_entry["quantity"] = 1
        db["users"].update_one(
            {"_id": user_id},
            {"$push": {"cart": cart_entry}}
        )

    return jsonify({"message": "Product added to cart"}), 200

@app.route('/users/cart', methods=['PATCH'])
def update_cart_item():
    data = request.get_json()
    user_id = data.get("user_id")
    product_id = data.get("product_id")
    quantity = data.get("quantity")

    if not all([user_id, product_id]) or quantity is None:
        return jsonify({"error": "Missing data"}), 400

    try:
        user_id = ObjectId(user_id)
        product_id = ObjectId(product_id)

        if quantity <= 0:
            result = db["users"].update_one(
                {"_id": user_id},
                {"$pull": {"cart": {"product_id": product_id}}}
            )
            print("Removed item:", result.modified_count)
            return jsonify({"message": "Item removed"}), 200

        result = db["users"].update_one(
            {"_id": user_id, "cart.product_id": product_id},
            {"$set": {"cart.$.quantity": quantity}}
        )

        print("Modified count:", result.modified_count)

        if result.modified_count == 0:
            user_doc = db["users"].find_one({"_id": user_id})
            print("Cart content:", user_doc.get("cart", []))
            return jsonify({"error": "Cart item not updated"}), 404

        return jsonify({"message": "Cart item updated"}), 200

    except Exception as e:
        print("PATCH error:", e)
        return jsonify({"error": str(e)}), 500






@app.route("/users/cart", methods=["GET"])
def get_cart():
    user_id = request.args.get("user_id")
    if not user_id:
        return jsonify({"error": "User ID is required"}), 400

    try:
        user_id = ObjectId(user_id)
    except:
        return jsonify({"error": "Invalid User ID format"}), 400

    user = db["users"].find_one({"_id": user_id})
    if not user:
        return jsonify({"error": "User not found"}), 404

    cart = user.get("cart", [])

    # Αν cart είναι [{product_id, quantity}], κάνε join με products
    products = []
    for item in cart:
        product = products_collection.find_one({"_id": item["product_id"]})
        if product:
            product["_id"] = str(product["_id"])
            product["quantity"] = item["quantity"]
            products.append(product)

    return jsonify(products), 200

@app.route('/users/cart', methods=['DELETE'])
def remove_from_cart():
    data = request.get_json()
    user_id = data.get('user_id')
    product_id = data.get('product_id')

    if not user_id or not product_id:
        return jsonify({'error': 'Missing data'}), 400

    db["users"].update_one(
        {"_id": ObjectId(user_id)},
        {"$pull": {"cart": {"product_id": ObjectId(product_id)}}}
    )

    return jsonify({"message": "Item removed"}), 200



@app.route("/users/liked-products", methods=["GET"])
def get_liked_products():
    user_id = request.args.get("user_id")
    if not user_id:
        return jsonify({"error": "User ID is required"}), 400

    try:
        user_obj_id = ObjectId(user_id)
    except Exception:
        return jsonify({"error": "Invalid User ID format"}), 400

    user = db["users"].find_one({"_id": user_obj_id})
    if not user:
        return jsonify({"error": "User not found"}), 404

    liked_product_ids = user.get("likes", [])

    # Μετατροπή σε ObjectId
    product_object_ids = [ObjectId(pid) for pid in liked_product_ids]

    liked_products = list(products_collection.find({"_id": {"$in": product_object_ids}}))
    for product in liked_products:
        product["_id"] = str(product["_id"])

    return jsonify(liked_products), 200


if __name__ == "__main__":
    app.run(debug=True,host="127.0.0.1",port=5000)
