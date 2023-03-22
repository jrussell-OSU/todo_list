from flask import Flask
from flask_cors import CORS
import datetime
from google.cloud import firestore


app = Flask(__name__)
CORS(app)

db = firestore.Client()


def print_users_and_todos():

    users_ref = db.collection('users')
    users = users_ref.stream()

    for user in users:
        print(f'{user.id} => {user.to_dict()}')
        todos_ref = db.collection('users').document(user.id).collection('todos')

        if todos_ref:
            todos = todos_ref.stream()
            for todo in todos:
                print(f'{todo.id} => {todo.to_dict()}')


print_users_and_todos()


@app.route('/data')
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
    app.run(host='localhost', port=5000, debug=True)
