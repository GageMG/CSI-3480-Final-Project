from flask import Flask, request, render_template
from API import app
import firebase_admin
from firebase_admin import credentials, firestore
from Init_fire import db

def reg_new_user(email, salt, verifier):
    
    try:
        db.collection("users").document(email).set( {
            "email": email,
            "salt": salt,
            "verifier": verifier
        })
        return True
    except Exception as v:
        print("Firestore error, ", v)
        return False
    