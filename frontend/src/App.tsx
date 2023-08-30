import './App.css'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
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
        <Draggable key={`draggable-${i}`} draggableId={`draggable-${i}`} index={i}>
          {(provided) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
              <TodoSlip
                key={i}
                name={todoSlipsArray[i].name}
                difficulty={todoSlipsArray[i].difficulty}
                priority={todoSlipsArray[i].priority}
                notes={todoSlipsArray[i].notes}
              />
            </div>
          )}
        </Draggable>,
      )
    }
    return componentsArr
  }

  const onDragEnd = () => {
    // update order of items
    console.log('onDragEnd')
  }

  return (
    <div className='App'>
      <div className='todoCardsDiv'>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId='droppableId'>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...provided.droppableProps}
                style={{
                  background: snapshot.isDraggingOver ? 'lightblue' : 'white', // Change background on drag over
                  padding: '16px',
                  border: '1px solid lightgrey',
                  minHeight: '100px', // Set a minimum height for the droppable area
                }}
              >
                {todoSlipsComponents()}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  )
}

export default App
