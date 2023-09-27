/* eslint-disable react/jsx-props-no-spreading */
import './App.css'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import TodoSlip from './components/TodoCard'
import '@fontsource/roboto'

interface TodoSlip {
  key: string
  name: string
  difficulty: number
  priority: string
  notes: string
}

function App(): JSX.Element {
  const [incompleteItems, setIncompleteItems] = useState<Array<TodoSlip>>([])
  const [completeItems, setCompleteItems] = useState<Array<TodoSlip>>([])

  const loadTodoData = () => {
    fetch('/data')
      .then((res) => res.json())
      .then(setIncompleteItems)
      .catch(() => console.error(`Error fetching '/':`))
  }

  useEffect(loadTodoData, [])

  // update order of TodoSlips
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result

    if (!destination) return

    // If moving a card around in the same column
    if (source.droppableId === destination.droppableId) {
      const items = Array.from(
        source.droppableId === 'incomplete-column' ? incompleteItems : completeItems,
      )
      const [reorderedItem] = items.splice(source.index, 1)
      items.splice(destination.index, 0, reorderedItem)

      if (source.droppableId === 'incomplete-column') {
        setIncompleteItems(items)
      } else {
        setCompleteItems(items)
      }
    } else {
      // If moving a card between columns
      const sourceItems = Array.from(
        source.droppableId === 'incomplete-column' ? incompleteItems : completeItems,
      )
      const destItems = Array.from(
        destination.droppableId === 'incomplete-column' ? incompleteItems : completeItems,
      )
      const [movedItem] = sourceItems.splice(source.index, 1)
      destItems.splice(destination.index, 0, movedItem)

      if (source.droppableId === 'incomplete-column') {
        setIncompleteItems(sourceItems)
        setCompleteItems(destItems)
      } else {
        setIncompleteItems(destItems)
        setCompleteItems(sourceItems)
      }
    }
  }

  const incompleteTodoSlipsComponents = (): JSX.Element[] =>
    incompleteItems.map((item, index: number) => (
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

  const completeTodoSlipsComponents = (): JSX.Element[] =>
    completeItems.map((item, index: number) => (
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
      <DragDropContext onDragEnd={onDragEnd}>
        <div className='todoCardsDiv'>
          <Droppable droppableId='incomplete-column'>
            {(provided, snapshot) => (
              <div
                className='droppable'
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  background: snapshot.isDraggingOver ? 'lightblue' : 'white', // Change background on drag over
                  padding: '16px',
                  border: '1px solid lightgrey',
                  minHeight: '100px',
                  borderRadius: '5px',
                }}
              >
                {incompleteTodoSlipsComponents()}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
        <div className='todoCardsDiv'>
          <Droppable droppableId='complete-column'>
            {(provided, snapshot) => (
              <div
                className='droppable'
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  background: snapshot.isDraggingOver ? 'lightblue' : 'white',
                  padding: '16px',
                  border: '1px solid lightgrey',
                  minHeight: '100px',
                  borderRadius: '5px',
                }}
              >
                {completeTodoSlipsComponents()}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  )
}

export default App
