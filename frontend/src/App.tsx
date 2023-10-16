import './App.css';
import React, { useEffect, useState } from 'react';
import TodoColumns from './components/TodoColumns';
import { fetchTodoData } from './utils/fetchData';
import { TodoProps } from './types/types';

function App(): JSX.Element {
  const [todos, setTodos] = useState<Array<TodoProps>>([]);

  const loadTodoData = async () => {
    try {
      const data = (await fetchTodoData()) as TodoProps[] | [];
      setTodos(data);
    } catch (error) {
      console.error(`Error fetching data: ${String(error)}`);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    loadTodoData();
  }, []);

  return (
    <div className='App'>
      <div className='AddTodoDiv'>add todo button</div>
      <br />
      <div className='columnsDiv'>
        <TodoColumns todos={todos} />
      </div>
    </div>
  );
}

export default App;
