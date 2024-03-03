import collections
from flask import Flask, render_template
import pymongo
from pymongo import MongoClient 
app=Flask(__name__)

# Database 
client = MongoClient("mongodb+srv://svemparala:password4mongo@letsgetphysical.25aybep.mongodb.net/test?retryWrites=true&w=majority")
db=client.user_login_system
# collections=db["user_login_system"] 

from user import routes

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/dashboard/')
def dashboard():
    return render_template('dashboard.html')



