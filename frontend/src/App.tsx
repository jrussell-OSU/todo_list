/* eslint-disable react/jsx-props-no-spreading */
import './App.css'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import TodoSlip from './components/TodoCard'
import '@fontsource/roboto'

function App(): JSX.Element {
  interface TodoSlip {
    key: string
    name: string
    difficulty: number
    priority: string
    notes: string
  }

  const [todoSlipsArray, setTodoSlips] = useState<Array<TodoSlip>>([])

  useEffect(() => {
    fetch('/data')
      .then(async (res) => {
        await res.json().then((newData: TodoSlip[]): void => {
          setTodoSlips(newData)
        })
      })
      .catch((error: string) => {
        // eslint-disable-next-line no-console
        console.error(`Error fetching '/': ${error}`)
      })
  }, [])

  // update order of TodoSlips
  const onDragEnd = (result: DropResult) => {
    if (result.destination) {
      const reorderedItems = Array.from(todoSlipsArray)
      const [reorderedItem] = reorderedItems.splice(result.source.index, 1)
      reorderedItems.splice(result.destination.index, 0, reorderedItem)

      setTodoSlips(reorderedItems)
    }
  }

  const todoSlipsComponents = (): JSX.Element[] =>
    todoSlipsArray.map((item, index: number) => (
      <Draggable key={item.key} draggableId={item.key} index={index}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            <TodoSlip
              key={item.key}
              name={item.name}
              difficulty={item.difficulty}
              priority={item.priority}
              notes={item.notes}
            />
          </div>
        )}
      </Draggable>
    ))

  return (
    <div className='App'>
      <div className='todoCardsDiv'>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId='droppableId'>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
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
