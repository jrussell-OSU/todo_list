from flask import Flask
import flask
import json
from flask_cors import CORS
import datetime
from google.cloud import datastore


app = Flask(__name__)
CORS(app)



@app.route('/')
def get_time():
    x = datetime.datetime.now()

    # Returning an api for showing in  reactjs
    return {
        'Name': "Jacob",
        "Age": "36",
        "Date": x,
        "programming": "python"
        }

if __name__ == "__main__":
    app.run(debug=True)
