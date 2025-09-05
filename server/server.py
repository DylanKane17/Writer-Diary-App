'''
This module instantiates Flask to run the backend API.
It handles user verification and access to the Firebase Realtime Database.
'''

import os
import firebase_admin
from firebase_admin import credentials, db, auth, exceptions
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()
CRED_FILE = os.getenv('PATH_TO_CRED')

app = Flask(__name__)
CORS(app,
     resources={r"/*": {"origins": ["http://localhost:5173", "http://127.0.0.1:5173"]}},
     allow_headers=["Content-Type", "Authorization"],
     methods=["GET", "POST", "OPTIONS"])

cred = credentials.Certificate(CRED_FILE)
firebase = firebase_admin.initialize_app(cred,
    {'databaseURL': 'https://firstproject-b2e92-default-rtdb.firebaseio.com'})


@app.route('/get-user-data', methods=["POST"])
def retrieve_user_data():
    '''Retrieves user data from db'''
    uid = request.json['uid']
    try:
        ref = db.reference(f'/user-data/{uid}')
        user_data = ref.get()
        return jsonify(user_data), 200
    except exceptions.PermissionDeniedError:
        return {"message": "Permission denied"}, 403
    except Exception as error:
        return {"message": "Something went wrong:", "error": str(error)}, 500

@app.route('/new-user-data', methods=["POST"])
def init_user_data():
    '''Writes data for a new user'''
    uid = request.json['uid']
    print(f"String: {str(uid)}")
    ref = db.reference('/user-data')
    ref.child(str(uid)).set(-1)
    ref = db.reference(f'/user-data/{uid}')
    user_data = ref.get()
    return jsonify(user_data), 200

@app.route("/verify-user", methods=["POST"])
def verify_user():
    '''Verifies user before allowing database modification'''
    id_token = request.json['JWT']
    decoded_token = auth.verify_id_token(id_token)
    uid = decoded_token['uid']
    return jsonify({"uid": uid})

@app.route('/add-user-project', methods=["POST"])
def add_project():
    '''Writes data for a new project'''
    to_add = {
        'name': request.json['name'],
        'progress': int(request.json['progress']),
        'target': int(request.json['target']),
        'entries': {}
    }
    uid = request.json['uid']
    user_ref = db.reference(f'/user-data/{uid}')
    user_ref.push().set(to_add)
    return {"message": "OK"}, 200


@app.route('/add-user-entry', methods=["POST"])
def add_entry():
    '''Writes data for a new entry'''
    to_add = {
        'title': request.json['title'],
        'notes': request.json['notes'],
        'date_added': request.json['date'],
        'progress': request.json['progress']
    }

    uid = request.json['uid']
    project = request.json['project']

    update_progress_ref = db.reference(f'/user-data/{uid}/{project}/progress')
    old_progress = update_progress_ref.get()
    new_progress = int(to_add['progress']) + int(old_progress)
    update_progress_ref.set(new_progress)

    user_ref = db.reference(f'/user-data/{uid}/{project}/entries')
    user_ref.push().set(to_add)
    return {"message": "OK"}, 200

@app.route('/update-user-data', methods=["POST"])
def update_data():
    '''Updates data for a specific entrys'''
    entry_id = request.json['entry_id']

    updated_data = {
        'title': request.json['title'],
        'notes': request.json['notes'],
        'date_added': request.json['date'],
        'progress': request.json['progress']
    }

    uid = request.json['uid']
    project = request.json['project']
    ref_to_update = db.reference(f'/user-data/{uid}/{project}/entries/{entry_id}')
    ref_to_update.push().set(updated_data)
    return {"message": "OK"}, 200

@app.route('/delete-user-data', methods=["POST"])
def delete_user_data():
    '''Deletes user data when their account no longer exists'''
    uid_to_delete = request.json['uid']
    user_ref_to_delete = db.reference(f'/user-data/{uid_to_delete}')
    user_ref_to_delete.delete()
    return {"message": "user data deleted!"}, 200

@app.route('/delete-user-project', methods=["POST"])
def delete_user_project():
    '''Deletes a user's project'''
    project = request.json['project']
    uid = request.json['uid']
    project_ref_to_delete = db.reference(f'/user-data/{uid}/{project}')
    project_ref_to_delete.delete()
    return {"message": "project deleted!"}, 200

if __name__ == "__main__":
    app.run(debug=True, port=5050)
