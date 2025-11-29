from database import create_user, delete_user, get_salt, create_item, delete_item, get_all_user_items

def db_get_salt(email):
  response = get_salt(email)
  if response is None:
      return ""
  return response

def db_create_user(email, verifier, salt, encDek):
   try:
      return create_user(email, verifier, salt, encDek)
   except Exception as e:
      return 400

def db_delete_user(guid):
   try:
      success = delete_user(guid)
      return success
   except Exception as e:
      print(f"error deleting user: {e}")
      return False
      

def db_create_item(user_guid, name, username, password):
  try:
     create_item(user_guid, name, username, password)
     return True
  except Exception as e:
     print(f"error creating item: {e}")
     return False
  
def db_delete_item(item_guid):
    try:
       delete_item(item_guid)
       return True
    except Exception as e:
       print(f"error deleting item: {e}")
       return False
    
def db_get_all_user_items(user_guid):
    try:
       items - get_all_user_items(user_guid)
       return items
    except Exception as e:
       print(f"error getting user items: {e}")
       return None
    
def db_login_user(email, verifier):
   try:
      users_ref = db.collection('users')
      user_docs = users_ref.where('email', '==', email).get()

      user_doc = None
      for doc in user_docs:
          user_doc = doc
          break
      
      if user_doc is None:
          print(f" No user found with that email.")
          return None
      
      user_data = user_doc.to_dict()

      if user_data["verifier"] != verifier:
          print(f" The verifier does not match.")
          return None
      
      return user_doc.id
   except Exception as e:
      print(f"error logging in user: {e}")
      return None
      