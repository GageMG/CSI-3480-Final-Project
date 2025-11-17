import firebase_admin
from firebase_admin import credentials, firestore
import uuid

# Initialize Firebase Admin SDK only ONCE
cred = credentials.Certificate("csi-3480-final-project-firebase-adminsdk-fbsvc-d81a131ec3.json")
if not firebase_admin._apps:
    firebase_admin.initialize_app(cred)

db = firestore.client()

# ------------------- USER FUNCTIONS -------------------

def create_user(email, verifier, salt):
    """Create a new user in Firestore with a unique GUID."""
    users_ref = db.collection('users')
    
    existing_user = users_ref.where('email', '==', email).get()
    if len(existing_user) > 0:
        print(f"⚠️ User with email {email} already exists.")
        return None

    guid = str(uuid.uuid4())
    users_ref.document(guid).set({
        'email': email,
        'verifier': verifier,
        'salt': salt
    })

    print(f"✅ User created with GUID: {guid}")
    return guid


def delete_user(guid):
    """Delete a user and all items associated with them."""
    user_ref = db.collection('users').document(guid)
    if not user_ref.get().exists:
        print(f"⚠️ User with GUID {guid} does not exist.")
        return False

    # Delete all items associated with this user
    items_ref = db.collection('items')
    items = items_ref.where('user_guid', '==', guid).get()
    batch = db.batch()
    for item in items:
        batch.delete(item.reference)
        print(f"🗑️ Queued deletion for item {item.id}")
    batch.delete(user_ref)
    batch.commit()

    print(f"🗑️ User with GUID {guid} and all associated items deleted.")
    return True


def get_salt(email):
    """Return the salt associated with an email, or None if not found."""
    users_ref = db.collection('users')
    user_docs = users_ref.where('email', '==', email).get()
    if not user_docs:
        print(f"⚠️ No user found with email {email}.")
        return None
    salt = user_docs[0].to_dict().get('salt')
    print(f"🔑 Salt for {email} is: {salt}")
    return salt


# ------------------- ITEM FUNCTIONS -------------------

def create_item(user_guid, name, username, password):
    """Create an item associated with a user."""
    items_ref = db.collection('items')
    guid = str(uuid.uuid4())

    items_ref.document(guid).set({
        'user_guid': user_guid,
        'name': name,
        'username': username,
        'password': password
    })

    print(f"✅ Item created with GUID: {guid}")
    return guid


def delete_item(guid):
    """Delete an item by GUID."""
    item_ref = db.collection('items').document(guid)
    if item_ref.get().exists:
        item_ref.delete()
        print(f"🗑️ Item with GUID {guid} deleted.")
        return True
    else:
        print(f"⚠️ Item with GUID {guid} does not exist.")
        return False
