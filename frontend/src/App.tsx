import './App.css'
import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import TodoSlip from './components/TodoCard'
import '@fontsource/roboto'
import { TodoSlipProps } from './types/types'
import { fetchTodoData } from './utils/fetchData'
import { reorderSameColumn, reorderDiffColumn } from './utils/reorderUtils'

function App(): JSX.Element {
  const [incompleteItems, setIncompleteItems] = useState<Array<TodoSlipProps>>([])
  const [completeItems, setCompleteItems] = useState<Array<TodoSlipProps>>([])

  const loadTodoData = async () => {
    try {
      const data = (await fetchTodoData()) as TodoSlipProps[] | []
      setIncompleteItems(data)
    } catch (error) {
      console.error(`Error fetching data: ${String(error)}`)
    }
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    loadTodoData()
  }, [])

  // update order of TodoSlips
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result

    if (!destination) return

    // If moving a todoSlip around in the same column
    if (source.droppableId === destination.droppableId) {
      const reorderedItems = reorderSameColumn(
        source,
        destination,
        source.droppableId === 'Incomplete' ? incompleteItems : completeItems,
      )
      if (source.droppableId === 'Incomplete') {
        setIncompleteItems(reorderedItems)
      } else {
        setCompleteItems(reorderedItems)
      }
    } else {
      // If moving between columns
      const [reorderedSourceItems, reorderedDestItems] = reorderDiffColumn(
        source,
        destination,
        source.droppableId === 'Incomplete' ? incompleteItems : completeItems,
        destination.droppableId === 'Incomplete' ? incompleteItems : completeItems,
      )
      if (source.droppableId === 'Incomplete') {
        setIncompleteItems(reorderedSourceItems)
        setCompleteItems(reorderedDestItems)
      } else {
        setIncompleteItems(reorderedDestItems)
        setCompleteItems(reorderedSourceItems)
      }
    }
  }

  const todoSlipsComponents = (todoItems: TodoSlipProps[]): JSX.Element[] =>
    todoItems.map((item, index: number) => (
      <Draggable key={item.id} draggableId={item.id} index={index}>
        {(provided) => (
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            <TodoSlip
              id={item.id}
              name={item.name}
              difficulty={item.difficulty}
              priority={item.priority}
              notes={item.notes}
            />
          </div>
        )}
      </Draggable>
    ))

  const renderColumns = (columnId: string, items: TodoSlipProps[]) => (
    <div className='todoCardsDiv'>
      <Droppable droppableId={columnId}>
        {(provided, snapshot) => (
          <div
            className='droppable'
            ref={provided.innerRef}
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...provided.droppableProps}
            style={{
              background: snapshot.isDraggingOver ? 'lightblue' : 'white', // Change background on drag over
              padding: '16px',
              border: '1px solid lightgrey',
              minHeight: '100px',
              borderRadius: '5px',
            }}
          >
            <div className='droppable-header'>{columnId} Tasks</div>
            {todoSlipsComponents(items)}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )

  return (
    <div className='App'>
      <DragDropContext onDragEnd={onDragEnd}>
        {renderColumns('Incomplete', incompleteItems)}
        {renderColumns('Complete', completeItems)}
      </DragDropContext>
    </div>
  )
}

export default App
