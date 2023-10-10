import './App.css';
import React from 'react';
import TodoColumns from './components/TodoColumns';

function App(): JSX.Element {
  return (
    <div className='App'>
      <div className='AddTodoCardDiv'>add todo button</div>
      <br />
      <div className='columnsDiv'>
        <TodoColumns />
      </div>
    </div>
  );
}

export default App;
