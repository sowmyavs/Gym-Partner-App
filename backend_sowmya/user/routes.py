from crypt import methods
from flask import Flask 
from app import app 
from user.models import User

@app.route('/user/signup', methods=['POST'])
def signup():
    return User().signup()
# /adduser
# /getuser
