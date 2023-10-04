import { TodoSlipProps } from '../types/types';

export async function createTodo(todo: TodoSlipProps) {
  try {
    const response = await fetch('/todos', {
      method: 'POST',
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
