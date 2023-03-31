import './App.css'
import * as React from 'react'
import { useEffect, useState } from 'react'
import TodoSlip from './components/TodoCard'
import '@fontsource/roboto'

function App(): JSX.Element {
  const [todoSlipsArray, setTodoSlips] = useState([
    { name: '', difficulty: 1, priority: '', notes: '' },
  ])

  useEffect(() => {
    fetch('/data')
      .then(async (res) => {
        await res
          .json()
          .then(
            (
              newData: { name: string; difficulty: number; priority: string; notes: string }[],
            ): void => {
              setTodoSlips(newData)
            },
          )
      })
      .catch((error: string) => {
        // eslint-disable-next-line no-console
        console.error(`Error fetching '/': ${error}`)
      })
  }, [])

  const todoSlipsComponents = (): JSX.Element[] => {
    const componentsArr: JSX.Element[] = []
    for (let i = 0; i < todoSlipsArray.length; i += 1) {
      componentsArr.push(
        <TodoSlip
          key={i}
          name={todoSlipsArray[i].name}
          difficulty={todoSlipsArray[i].difficulty}
          priority={todoSlipsArray[i].priority}
          notes={todoSlipsArray[i].notes}
        />,
      )
    }
    return componentsArr
  }

  return (
    <div className='App'>
      <div className='todoSlipsDiv'>{todoSlipsComponents()}</div>
    </div>
  )
}

export default App
