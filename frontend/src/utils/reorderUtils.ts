import { DraggableLocation } from 'react-beautiful-dnd'
import { TodoSlipProps } from '../types/types'

export const reorderSameColumn = (
  source: DraggableLocation,
  destination: DraggableLocation,
  items: TodoSlipProps[],
) => {
  const reorderedItems = Array.from(items)
  const [reorderedItem] = reorderedItems.splice(source.index, 1)
  reorderedItems.splice(destination.index, 0, reorderedItem)
  return reorderedItems
}

export const reorderDiffColumn = (
  source: DraggableLocation,
  destination: DraggableLocation,
  sourceItems: TodoSlipProps[],
  destItems: TodoSlipProps[],
) => {
  // If moving a card between columns
  const reorderedSourceItems = Array.from(sourceItems)
  const reorderedDestItems = Array.from(destItems)
  const [movedItem] = reorderedSourceItems.splice(source.index, 1)
  reorderedDestItems.splice(destination.index, 0, movedItem)
  return [reorderedSourceItems, reorderedDestItems]
}
