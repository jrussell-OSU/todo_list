import { TodoProps } from '../types/types';

const ENDPOINT = 'todos';

export const fetchTodoData = async (): Promise<TodoProps[]> => {
  try {
    const response = await fetch(ENDPOINT);

    if (!response.ok) {
      console.error(
        `Fetch data for loadTodoData failed, status: ${response.status}: ${response.statusText}`,
      );
      throw new Error('Failed to load your todo slips. Please try to reload the page.');
    }

    const data = (await response.json()) as TodoProps[];
    return data;
  } catch (error) {
    console.error(`Error fetching loadTodoData:`, error);
    return [];
  }
};
