import collections
from gc import collect
from flask import Flask, jsonify, request
from passlib.hash import pbkdf2_sha256
import uuid
import pymongo
from pymongo import MongoClient 
from app import db


class User:
    
    def signup(self):
        print(request.form)
        # Create the user object
        user={
            "_id": uuid.uuid4().hex, 
            "name": request.form.get("name"), 
            "email":request.form.get("email"), 
            "password":request.form.get("password")
        }
        # Encrypt the password
        user['password']= pbkdf2_sha256.encrypt(user['password'])
        # check for existing email address
        if db.users.find_one({"email": user['email']}):
            return jsonify({"error": "Email address already in use"}), 400
        db.users.insert_one(user)
        return jsonify(user), 200 
    
    
        
        
    
    
    
    

        