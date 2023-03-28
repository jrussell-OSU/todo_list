import './App.css'
import * as React from 'react'
import { useEffect, useState } from 'react'
import TodoSlip from './components/TodoCard'
import '@fontsource/roboto'

function App (): JSX.Element {
  // usestate for setting a javascript
  // object for storing and using data

  const [todoSlipsArray, setTodoSlips] = useState([{ name: '', difficulty: 1, priority: '', notes: '' }])
  // Using useEffect for single rendering
  useEffect(() => {
    // Using fetch to fetch the api from
    // flask server it will be redirected to proxy
    fetch('/data')
      .then(async (res) => {
        await res.json()
          .then((newData) => {
            // Setting a data from api
            setTodoSlips(newData)
          })
      })
      // eslint-disable-next-line no-console
      .catch((error: string) => { console.error(`Error fetching '/': ${error}`) })
  }, [])

  const todoSlipsComponents = (): JSX.Element[] => {
    const componentsArr: JSX.Element[] = []
    for (let i = 0; i < todoSlipsArray.length; i++) {
      componentsArr.push(
        <TodoSlip
          key={i}
          name={todoSlipsArray[i].name}
          difficulty={todoSlipsArray[i].difficulty}
          priority={todoSlipsArray[i].priority}
          notes={todoSlipsArray[i].notes}
        />
      )
    }
    return componentsArr
  }

  return (
    <div className="App">
      <div className="todoSlipsDiv">
        {todoSlipsComponents()}
      </div>
    </div>
  )
}

export default App
