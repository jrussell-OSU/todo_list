import { reorderSameColumn, reorderBetweenColumns } from './utils/reorderUtils';
import { TodoSlipProps } from './types/types';

const sampleItems1 = [
  {
    id: '1',
    name: 'name1',
    priority: 'medium',
    difficulty: 1,
    notes: 'test todo #1',
  },
  {
    id: '2',
    name: 'name2',
    priority: 'low',
    difficulty: 2,
    notes: 'test todo #2',
  },
  {
    id: '3',
    name: 'name3',
    priority: 'high',
    difficulty: 3,
    notes: 'test todo #3',
  },
];

const sampleItems2 = [
  {
    id: '4',
    name: 'name4',
    priority: 'medium',
    difficulty: 4,
    notes: 'test todo #4',
  },
  {
    id: '5',
    name: 'name5',
    priority: 'low',
    difficulty: 5,
    notes: 'test todo #5',
  },
  {
    id: '6',
    name: 'name6',
    priority: 'high',
    difficulty: 6,
    notes: 'test todo #6',
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

function reorderOneArray(sourceIndex: number, destIndex: number, arr: TodoSlipProps[]) {
  const [e] = arr.splice(sourceIndex, 1);
  arr.splice(destIndex, 0, e);
  return arr;
}

describe('reorderSameColumn', () => {
  test.each(createIndexPairs())('moving from index %p to %p', (source: number, dest: number) => {
    const sourceIndex = { index: source, droppableId: 'incomplete' };
    const destIndex = { index: dest, droppableId: 'incomplete' };

    const result = reorderSameColumn(sourceIndex, destIndex, [...sampleItems1]);

    const expected = reorderOneArray(sourceIndex.index, destIndex.index, [...sampleItems1]);

    expect(result).toEqual(expected);
  });
});

function reorderTwoArrays(
  sourceIndex: number,
  destIndex: number,
  arr1: TodoSlipProps[],
  arr2: TodoSlipProps[],
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
      [...sampleItems1],
      [...sampleItems2],
    );

    const expected = reorderTwoArrays(
      sourceIndex.index,
      destIndex.index,
      [...sampleItems1],
      [...sampleItems2],
    );

    expect(result).toEqual(expected);
  });
});
