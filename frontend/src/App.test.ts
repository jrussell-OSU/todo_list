import { reorderSameColumn } from './utils/reorderUtils'
import { TodoSlipProps } from './types/types'

function createSampleItems() {
  return [
    {
      id: '1HH2H89324299JF01',
      name: 'name1',
      priority: 'medium',
      difficulty: 1,
      notes: 'test todo #1',
    },
    {
      id: '1904JKDFJIO784123',
      name: 'name2',
      priority: 'low',
      difficulty: 2,
      notes: 'test todo #2',
    },
    {
      id: '1309JFJKLFH18JKJFA',
      name: 'name2',
      priority: 'high',
      difficulty: 3,
      notes: 'test todo #3',
    },
    {
      id: '132JAOSDJF1O4H89FA',
      name: 'name3',
      priority: 'urgent',
      difficulty: 4,
      notes: 'test todo #4',
    },
  ]
}

function createSampleItems2() {
  return [
    {
      id: '1231I24JU89U8FHF2',
      name: 'name5',
      priority: 'LOW',
      difficulty: 5,
      notes: 'test todo #5',
    },
    {
      id: '2IFIAWIF12489HIUF',
      name: 'name6',
      priority: 'MEDIUM',
      difficulty: 6,
      notes: 'test todo #6',
    },
    {
      id: 'H78HF7QH778HA79FH3',
      name: 'name7',
      priority: 'HIGH',
      difficulty: 7,
      notes: 'test todo #7',
    },
    {
      id: '14H70HWF70H7H2H1H79',
      name: 'name8',
      priority: 'URGENT',
      difficulty: 8,
      notes: 'test todo #8',
    },
  ]
}

function reorderArray(sourceIndex: number, destIndex: number, arr: TodoSlipProps[]) {
  const [e] = arr.splice(sourceIndex, 1)
  arr.splice(destIndex, 0, e)

  return arr
}

describe('reorderSameColumn', () => {
  it('should correctly reorder in same column', () => {
    const sourceIndex = { index: 0, droppableId: 'incomplete' }
    const destIndex = { index: 2, droppableId: 'incomplete' }

    const result = reorderSameColumn(sourceIndex, destIndex, createSampleItems())
    // console.log(JSON.stringify(result, null, 4))

    const expected = reorderArray(sourceIndex.index, destIndex.index, createSampleItems())
    // console.log(JSON.stringify(expected, null, 4))

    expect(result).toEqual(expected)
  })
})
