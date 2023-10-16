/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect, useState } from 'react';
// import Button from '@mui/material/Button';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggableLocation,
  DroppableId,
} from 'react-beautiful-dnd';
import TodoSlip from './Todo';
import '@fontsource/roboto';
import { TodoProps } from '../types/types';
import { reorderSameColumn, reorderBetweenColumns } from '../utils/reorderUtils';
import { updateTodo } from '../utils/todoServices';

function TodoColumns({ todos }: { todos: TodoProps[] }): JSX.Element {
  const [incompleteItems, setIncompleteItems] = useState<Array<TodoProps>>([]);
  const [completeItems, setCompleteItems] = useState<Array<TodoProps>>([]);

  useEffect(() => {
    setIncompleteItems(todos.filter((todo) => todo.status === 'incomplete'));
    setCompleteItems(todos.filter((todo) => todo.status === 'complete'));
  }, [todos]);

  type SetStateFunction = (items: Array<TodoProps>) => void;

  const updateFunctionMap: Record<DroppableId, SetStateFunction> = {
    Incomplete: setIncompleteItems,
    Complete: setCompleteItems,
  };

  const itemArraysMap: Record<DroppableId, TodoProps[]> = {
    Incomplete: incompleteItems,
    Complete: completeItems,
  };

  const handleSameColumnMovement = (
    source: DraggableLocation,
    dest: DraggableLocation,
    items: TodoProps[],
  ) => {
    const reorderedItems = reorderSameColumn(source, dest, items);
    const updateColumnFunction = updateFunctionMap[source.droppableId];
    if (updateColumnFunction) {
      updateColumnFunction(reorderedItems);
    }
  };

  const handleBetweenColumnMovement = (source: DraggableLocation, dest: DraggableLocation) => {
    const sourceItems = itemArraysMap[source.droppableId];
    const destItems = itemArraysMap[dest.droppableId];
    const [reorderedSourceItems, reorderedDestItems] = reorderBetweenColumns(
      source,
      dest,
      sourceItems,
      destItems,
    );
    const updateSourceColumnFunction = updateFunctionMap[source.droppableId];
    const updateDestColumnFunction = updateFunctionMap[dest.droppableId];
    updateSourceColumnFunction(reorderedSourceItems);
    updateDestColumnFunction(reorderedDestItems);
  };

  // update order of TodoItems
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      handleSameColumnMovement(
        source,
        destination,
        source.droppableId === 'Incomplete' ? incompleteItems : completeItems,
      );
    } else {
      handleBetweenColumnMovement(source, destination);

      // Change status depending on which column it's moving to
      const movingItem =
        source.droppableId === 'Incomplete'
          ? incompleteItems[source.index]
          : completeItems[source.index];
      movingItem.status = destination.droppableId.toLowerCase();

      // Save items before change, to revert frontend "optimistic" changes if backend updates fail
      const savedIncompleteItems = [...incompleteItems];
      const savedCompleteItems = [...completeItems];

      updateTodo(movingItem)
        .then(() => {
          handleBetweenColumnMovement(source, destination);
        })
        .catch((error) => {
          console.error('Error updating todo', error);
          setIncompleteItems(savedIncompleteItems);
          setCompleteItems(savedCompleteItems);
        });
    }
  };

  const todoSlipsComponents = (todoItems: TodoProps[]): JSX.Element[] =>
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
              status={item.status}
            />
          </div>
        )}
      </Draggable>
    ));

  const columnsToRender = [
    { columnId: 'Incomplete', items: incompleteItems },
    { columnId: 'Complete', items: completeItems },
  ];

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {columnsToRender.map(({ columnId, items }) => (
        <div className='todosDiv' key={columnId}>
          <Droppable droppableId={columnId}>
            {(provided, snapshot) => (
              <div
                className='droppable'
                ref={provided.innerRef}
                /* eslint-disable-next-line react/jsx-props-no-spreading */
                {...provided.droppableProps}
                style={{
                  background: snapshot.isDraggingOver ? 'lightblue' : 'white', // Change column background on todoSlip drag
                  padding: '16px',
                  border: '1px solid lightgrey',
                  minHeight: '100px',
                  borderRadius: '5px',
                }}
              >
                <div className='droppable-header'>{columnId}</div>
                {todoSlipsComponents(items)}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      ))}
    </DragDropContext>
  );
}

export default TodoColumns;
