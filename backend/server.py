from typing import List, TypedDict, cast

from flask import Flask, request, Response, jsonify
from flask_cors import CORS
from google.cloud import firestore  # type: ignore

app = Flask(__name__)
CORS(app)

db = firestore.Client()


HOST = 'localhost'
PORT = 5000


class Todo(TypedDict):
    id: str
    name: str
    difficulty: int
    priority: str
    notes: str
    status: str


def get_all_todos() -> List[Todo]:
    todos: List[Todo] = []
    todos_ref = db.collection('todos')
    todos_stream = todos_ref.stream()
    for todo in todos_stream:
        todo_data = todo.to_dict()
        merged_data = {"id": todo.id, **todo_data}
        # print(merged_data)
        if is_valid_todo(merged_data):
            validated_todo = cast(Todo, merged_data)
            todos.append(validated_todo)
    return todos


def add_new_todo(data: Todo) -> None:

    # get a unique ID for document before actually adding to database
    doc_ref = db.collection('todos').document()

    # attach that unique ID to the todo item as "id"
    data["id"] = doc_ref.id
    doc_ref.set(data)


def is_valid_todo(data: dict) -> bool:
    required_keys = {"name", "difficulty", "priority", "notes", "status"}
    return required_keys.issubset(data.keys()) or False


@app.route('/todos', methods=['GET', 'POST'])
def handle_todos() -> Response:
    if request.method == 'GET':
        return jsonify(get_all_todos())

    elif request.method == 'POST':
        json_data = request.json
        if json_data is None or not is_valid_todo(json_data):
            return jsonify({"error": "invalid data"})
        add_new_todo(json_data)
        return jsonify(get_all_todos())

    else:
        return jsonify({"error": "unknown error"})


@app.route('/todos/<todo_id>/status', methods=['PATCH'])
def update_todo_status(todo_id) -> Response:
    status = request.json
    if not status:
        return jsonify({"error": "todo 'status' field is required"})

    doc_ref = db.collection('todos').document(todo_id)
    doc_ref.update({"status": status})

    return jsonify({"message": "status update successful"})


if __name__ == "__main__":
    app.run(host=HOST, port=PORT, debug=True)
