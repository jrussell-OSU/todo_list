from flask import Flask
from flask_cors import CORS
from google.cloud import firestore
from uuid import uuid4

app = Flask(__name__)
CORS(app)

db = firestore.Client()


def print_users_and_todos():
    """Purely for testing, TODO: Delete"""
    users_ref = db.collection('users')
    users = users_ref.stream()

    for user in users:
        print(f'{user.id} => {user.to_dict()}')
        todos_ref = db.collection('users').document(user.id).collection('todos')

        if todos_ref:
            todos = todos_ref.stream()
            for todo in todos:
                print(f'{todo.id} => {todo.to_dict()}')


# print_users_and_todos()

todos = [
            {
                'id': uuid4().hex,
                'name': 'walk the dogs',
                'difficulty': 8,
                'priority': 'high',
                'notes': 'Practice loose leash training'
            },
            {
                'id': uuid4().hex,
                'name': 'run dishwasher',
                'difficulty': 4,
                'priority': 'medium',
                'notes': 'Use two of the dish wash pods'
            },
            {
                'id': uuid4().hex,
                'name': 'feed pets',
                'difficulty': 2,
                'priority': 'high',
                'notes': '-----------------------'
            }
        ]

print(todos)


@app.route('/data')
def get_todos():
    # Returning an api for showing in  reactjs
    return todos


if __name__ == "__main__":
    app.run(host='localhost', port=5000, debug=True)
