import { reorderSameColumn, reorderBetweenColumns } from './utils/reorderUtils';
import { TodoProps } from './types/types';

const incompleteItems = [
  {
    id: '1',
    name: 'name1',
    priority: 'medium',
    difficulty: 1,
    notes: 'test todo #1',
    status: 'incomplete',
  },
  {
    id: '2',
    name: 'name2',
    priority: 'low',
    difficulty: 2,
    notes: 'test todo #2',
    status: 'incomplete',
  },
  {
    id: '3',
    name: 'name3',
    priority: 'high',
    difficulty: 3,
    notes: 'test todo #3',
    status: 'incomplete',
  },
];

const completeItems = [
  {
    id: '4',
    name: 'name4',
    priority: 'medium',
    difficulty: 4,
    notes: 'test todo #4',
    status: 'complete',
  },
  {
    id: '5',
    name: 'name5',
    priority: 'low',
    difficulty: 5,
    notes: 'test todo #5',
    status: 'complete',
  },
  {
    id: '6',
    name: 'name6',
    priority: 'high',
    difficulty: 6,
    notes: 'test todo #6',
    status: 'complete',
  },
];

function createIndexPairs() {
  // Create array of possible[source index, dest index] pairs to test
  const testIndices: [number, number][] = [];
  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      testIndices.push([j, i]);
    }
  }
  return testIndices;
}

function reorderOneArray(sourceIndex: number, destIndex: number, arr: TodoProps[]) {
  const [e] = arr.splice(sourceIndex, 1);
  arr.splice(destIndex, 0, e);
  return arr;
}

describe('reorderSameColumn', () => {
  test.each(createIndexPairs())('moving from index %p to %p', (source: number, dest: number) => {
    const sourceIndex = { index: source, droppableId: 'incomplete' };
    const destIndex = { index: dest, droppableId: 'incomplete' };

    const result = reorderSameColumn(sourceIndex, destIndex, [...incompleteItems]);

    const expected = reorderOneArray(sourceIndex.index, destIndex.index, [...incompleteItems]);

    expect(result).toEqual(expected);
  });
});

function reorderTwoArrays(
  sourceIndex: number,
  destIndex: number,
  arr1: TodoProps[],
  arr2: TodoProps[],
) {
  const [e] = arr1.splice(sourceIndex, 1);
  arr2.splice(destIndex, 0, e);
  return [arr1, arr2];
}

describe('reorderBetweenColumns', () => {
  // Create array of possible[source index, dest index] pairs to test
  test.each(createIndexPairs())('moving from index %p to %p', (source: number, dest: number) => {
    const sourceIndex = { index: source, droppableId: 'incomplete' };
    const destIndex = { index: dest, droppableId: 'incomplete' };

    const result = reorderBetweenColumns(
      sourceIndex,
      destIndex,
      [...incompleteItems],
      [...completeItems],
    );

    const expected = reorderTwoArrays(
      sourceIndex.index,
      destIndex.index,
      [...incompleteItems],
      [...completeItems],
    );

    expect(result).toEqual(expected);
  });
});
