 import firebase_admin
from firebase_admin import credentials, firestore
import uuid

# Initialize Firebase Admin SDK
cred = credentials.Certificate("csi-3480-final-project-firebase-adminsdk-fbsvc-d81a131ec3.json")
if not firebase_admin._apps:
    firebase_admin.initialize_app(cred)

db = firestore.client()


# USER FUNCTIONS

def create_user(email, verifier, salt, encDek):
    "Create a new user in Firestore with a unique GUID."
    users_ref = db.collection('users')
    
    existing_user = users_ref.where('email', '==', email).get()
    if len(existing_user) > 0:
        return 409

    guid = str(uuid.uuid4())
    users_ref.document(guid).set({
        'email': email,
        'verifier': verifier,
        'salt': salt,
        'encDek': encDek
    })

    return 201

def delete_user(guid):
    user_ref = db.collection('users').document(guid)
    if not user_ref.get().exists:
        print(f"User with GUID {guid} does not exist.")
        return False

    items_ref = db.collection('items')
    items = items_ref.where("user_guid", "==", guid).get()

    batch = db.batch()
    for item in items:
        batch.delete(item.reference)
    batch.delete(user_ref)
    batch.commit()

    print(f"User {guid} and all items deleted.")
    return True


def get_salt(email):
    users_ref = db.collection('users')
    docs = users_ref.where("email", "==", email).get()
    if not docs:
        return None
    return docs[0].to_dict().get("salt")


def login_user(email, verifier):
    users_ref = db.collection('users')
    docs = users_ref.where("email", "==", email).get()

    if not docs:
        print("No user with that email.")
        return None

    user_data = docs[0].to_dict()
    if user_data["verifier"] != verifier:
        print("Verifier mismatch.")
        return None

    return docs[0].id


# ITEM FUNCTIONS

def create_item(user_guid, name, username, password):
    items_ref = db.collection('items')
    guid = str(uuid.uuid4())

    items_ref.document(guid).set({
        "user_guid": user_guid,
        "name": name,
        "username": username,
        "password": password
    })

    print(f"Item created with GUID: {guid}")
    return guid


def delete_item(guid):
    item_ref = db.collection('items').document(guid)
    if not item_ref.get().exists:
        print("Item does not exist.")
        return False

    item_ref.delete()
    print(f"Item {guid} deleted.")
    return True


def get_all_user_items(user_guid):
    items_ref = db.collection("items")
    docs = items_ref.where("user_guid", "==", user_guid).get()

    results = []
    for doc in docs:
        data = doc.to_dict()
        data["guid"] = doc.id
        results.append(data)

    print(f"Retrieved {len(results)} items.")
    return results
