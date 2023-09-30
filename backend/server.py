from flask import Flask, request
from flask_cors import CORS
from google.cloud import firestore

app = Flask(__name__)
CORS(app)

db = firestore.Client()


def get_all_todos_for_all_users():
    users_ref = db.collection('users')
    users = users_ref.stream()
    todos = []
    for user in users:
        todos_ref = db.collection('users').document(user.id).collection('todos')
        todos_stream = todos_ref.stream()
        for todo in todos_stream:
            todos.append({"id": todo.id, **todo.to_dict()})
    return todos


@app.route('/todos', methods=['GET', 'POST'])
def handle_todos():
    if request.method == 'GET':
        return get_all_todos_for_all_users()

    elif request.method == 'POST':
        data = request.data
        print(f'got todo data: {data}')
        return data


if __name__ == "__main__":
    app.run(host='localhost', port=5000, debug=True)
