## Pull latest repository!

Tutorial we used (sequence of 3 tutorials): <https://medium.com/geekculture/building-a-farm-application-part-1-installation-and-configuration-ad730756e1fa>

## MongoDB

1.  Create account here: <https://www.mongodb.com/atlas> (I invited you to the db project)

1.  You should have received an email

3.  Your credentials for the LetsGetPhysical database are: username=<your net id> and password=password4mongo

4.  View the LetsGetPhysical database on your account and press "Connect"

5.  Choose the option "connect using MongoDB Compass" and follow the steps. (MongoDB compass is a GUI for using MongoDB)

## Installations:

1.  Python (3.9 or later)

2.  Install pip: 'sudo apt install python3-pip' or if that doesn't work 'sudo abt install python-pip'

3.  NodeJS: <https://nodejs.org/en/download/>

## FastAPI

1.  Cd into backend folder

2.  'pip install -r requirements.txt'

3.  Also run 'python -m uvicorn main:app --reload'

1.  ** doesn't download anything, allows to test backend through link**

5.  It will give you a url, open it and append /docs to it to access api

## FrontEnd (React)

1.  Cd into frontend folder

2.  npx browserslist@latest --update-db

3.  npm install

4.  npm start - starts the front end interface

## MongoDB python dependencies

1.  Cd into backend folder

2.  'pip install motor'

3.  'pip install pymongo[srv]'

# To run app:

1.  From backend: python -m uvicorn main:app --reload

2.  From frontend: npm start