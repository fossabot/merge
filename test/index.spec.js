import {add} from '../src'

describe('@merge', () => {
  describe('#add', () => {
    test('it should return 2', () => {
      expect(add(1, 1)).toBe(2)
    })
  })
})
