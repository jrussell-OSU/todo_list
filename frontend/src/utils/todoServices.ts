import { TodoProps } from '../types/types';

export async function createTodo(todo: TodoProps) {
  try {
    const response = await fetch('/todos', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });

    if (!response.ok) {
      throw new Error(`Error posting new todo slip: ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error('There was a problem posting the todo:', error);
  }
}

export async function updateTodo(todo: TodoProps) {
  try {
    const response = await fetch(`/todos/${todo.id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo.status),
    });

    if (!response.ok) {
      throw new Error(`Error updating todo slip: ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error('There was a problem updating the todo:', error);
  }
}
