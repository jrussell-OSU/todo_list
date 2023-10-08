from flask import Flask, request
from flask_cors import CORS
from google.cloud import firestore  # type: ignore
from typing import Dict, List, TypedDict

app = Flask(__name__)
CORS(app)

db = firestore.Client()


class Todo(TypedDict):
    id: str
    name: str
    difficulty: int
    priority: str
    notes: str


def get_all_todos():
    todos: List[Todo] = []
    todos_ref = db.collection('todos')
    todos_stream = todos_ref.stream()
    for todo in todos_stream:
        todos.append({"id": todo.id, **todo.to_dict()})
    return todos


def new_todo(data: Todo):
    return db.collection('todos').add(data)


@app.route('/todos', methods=['GET', 'POST'])
def handle_todos():
    if request.method == 'GET':
        return get_all_todos()

    elif request.method == 'POST':
        new_doc = new_todo(request.json)
        print(f'Added new document: {new_doc}')
        return get_all_todos()


if __name__ == "__main__":
    app.run(host='localhost', port=5000, debug=True)
