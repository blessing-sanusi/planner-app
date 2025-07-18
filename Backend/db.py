# import firebase_admin
# from firebase_admin import credentials, firestore

# # Replace with your service account file path
# cred = credentials.Certificate("path/to/your/serviceAccountKey.json")

# # Initialize the Firebase app
# firebase_admin.initialize_app(cred)

# # Get the Firestore DB
# db = firestore.client()


import os
import json
import firebase_admin
from firebase_admin import credentials, firestore

from dotenv import load_dotenv
load_dotenv()


firebase_json = os.getenv("FIREBASE_SERVICE_ACCOUNT_JSON")
if not firebase_json:
    raise Exception("FIREBASE_SERVICE_ACCOUNT_JSON environment variable not set")

# Parse the JSON string into a dict
cred_dict = json.loads(firebase_json)

# Use the dict to create credentials
cred = credentials.Certificate(cred_dict)

# Initialize Firebase app
firebase_admin.initialize_app(cred)

# Get Firestore client
db = firestore.client()
