import Merge from '../src'

/* eslint-disable max-nested-callbacks */
/* eslint-disable max-statements */

describe('Merge', () => {
  describe('#mergeObject', () => {
    test('source is not object', () => {
      const merge1 = new Merge()

      expect(() => merge1.mergeObject(1, 2)).toThrow()
      expect(() => merge1.mergeObject(1, 2)).toThrowError(
        '`source` should be an object'
      )
    })

    test('source is object, but target is not object', () => {
      const merge1 = new Merge()
      const merge2 = new Merge({object: {object: false}})
      const source = {a: 1, b: 2}

      expect(merge1.mergeObject(source, 1)).toBe(1)
      expect(merge2.mergeObject(source, 1)).toMatchObject({a: 1, b: 2})
      expect(merge2.mergeObject(source, '123')).toMatchObject({
        0: '1',
        1: '2',
        2: '3',
        a: 1,
        b: 2
      })
    })

    test('source is object, and target is also object', () => {
      const merge1 = new Merge()
      const merge2 = new Merge({object: {nullable: false}})
      const merge3 = new Merge({object: {undefinable: false}})
      const merge4 = new Merge({
        object: {nullable: false, undefinable: false}
      })
      const source = {a: 1, b: 2}
      const target = {a: null, b: undefined, c: null, d: undefined}

      expect(merge1.mergeObject(source, target)).toMatchObject({
        a: null,
        b: undefined,
        c: null,
        d: undefined
      })
      expect(merge2.mergeObject(source, target)).toMatchObject({
        a: 1,
        b: undefined,
        d: undefined
      })
      expect(merge3.mergeObject(source, target)).toMatchObject({
        a: null,
        b: 2,
        c: null
      })
      expect(merge4.mergeObject(source, target)).toMatchObject({a: 1, b: 2})
    })
  })

  describe('#mergeArray', () => {
    test('source is not an array', () => {
      const merge = new Merge()

      expect(() => merge.mergeArray(1, 2)).toThrow()
      expect(() => merge.mergeArray(1, 2)).toThrowError(
        '`source` should be an array'
      )
    })

    test('source is an array, but target is not an array', () => {
      const merge1 = new Merge()
      const merge2 = new Merge({array: {array: false}})
      const merge3 = new Merge({array: {type: 'replace'}})
      const merge4 = new Merge({array: {type: 'push', filter: true}})
      const merge5 = new Merge({array: {type: 'push', filter: false}})
      const merge6 = new Merge({array: {type: 'unshift', filter: true}})
      const merge7 = new Merge({array: {type: 'unshift', filter: false}})
      const merge8 = new Merge({array: {type: 'merge', merge: true}})
      const merge9 = new Merge({array: {type: 'merge', merge: false}})
      const source = [1, 2]

      expect(merge1.mergeArray(source, 1)).toBe(1)
      expect(merge2.mergeArray(source, 3)).toMatchObject([3])
      expect(merge2.mergeArray(source, 'ab')).toMatchObject(['a', 'b'])
      expect(merge3.mergeArray(source, [3])).toMatchObject([3])
      expect(merge3.mergeArray(source, [3, 4])).toMatchObject([3, 4])
      expect(merge3.mergeArray(source, [3, 2])).toMatchObject([3, 2])
      expect(merge3.mergeArray(source, [3, 2, 1])).toMatchObject([3, 2, 1])
      expect(merge4.mergeArray(source, 1)).toMatchObject([2, 1])
      expect(merge4.mergeArray(source, '12')).toMatchObject([1, 2, '1', '2'])
      expect(merge4.mergeArray(source, [3, 4])).toMatchObject([1, 2, 3, 4])
      expect(merge4.mergeArray(source, [3, 2])).toMatchObject([1, 3, 2])
      expect(merge4.mergeArray(source, [3, 2, 1])).toMatchObject([3, 2, 1])
      expect(merge5.mergeArray(source, 1)).toMatchObject([1, 2, 1])
      expect(merge5.mergeArray(source, '12')).toMatchObject([1, 2, '1', '2'])
      expect(merge5.mergeArray(source, [3, 4])).toMatchObject([1, 2, 3, 4])
      expect(merge5.mergeArray(source, [3, 2])).toMatchObject([1, 2, 3, 2])
      expect(merge5.mergeArray(source, [3, 2, 1])).toMatchObject([
        1,
        2,
        3,
        2,
        1
      ])
      expect(merge6.mergeArray(source, 1)).toMatchObject([1, 2])
      expect(merge6.mergeArray(source, '12')).toMatchObject(['1', '2', 1, 2])
      expect(merge6.mergeArray(source, [3, 4])).toMatchObject([3, 4, 1, 2])
      expect(merge6.mergeArray(source, [3, 2])).toMatchObject([3, 2, 1])
      expect(merge6.mergeArray(source, [3, 2, 1])).toMatchObject([3, 2, 1])
      expect(merge7.mergeArray(source, 1)).toMatchObject([1, 1, 2])
      expect(merge7.mergeArray(source, '12')).toMatchObject(['1', '2', 1, 2])
      expect(merge7.mergeArray(source, [3, 4])).toMatchObject([3, 4, 1, 2])
      expect(merge7.mergeArray(source, [3, 2])).toMatchObject([3, 2, 1, 2])
      expect(merge7.mergeArray(source, [3, 2, 1])).toMatchObject([
        3,
        2,
        1,
        1,
        2
      ])
      expect(
        merge8.mergeArray([1, [1], {a: 1}], ['a', ['a'], {a: 'a'}])
      ).toMatchObject(['a', ['a'], {a: 'a'}])
      expect(
        merge9.mergeArray(
          [{a: 1}, [1], 1, 2, null, undefined],
          [{b: 2}, [2], null, undefined, 1, 2],
          {nullable: false}
        )
      ).toMatchObject([{b: 2}, [2], 1, undefined, 1, 2])
      expect(
        merge9.mergeArray(
          [{a: 1}, [1], 1, 2, null, undefined],
          [{b: 2}, [2], null, undefined, 1, 2],
          {undefinable: false}
        )
      ).toMatchObject([{b: 2}, [2], null, 2, 1, 2])
      expect(
        merge9.mergeArray(
          [{a: 1}, [1], 1, 2, null, undefined],
          [{b: 2}, [2], null, undefined, 1, 2],
          {nullable: false, undefinable: false}
        )
      ).toMatchObject([{b: 2}, [2], 1, 2, 1, 2])
    })

    test('source is an array, and target is also an array', () => {
      // const merge1 = new Merge()
      // const merge2 = new Merge({array: {array: false}})
      // const merge3 = new Merge({array: {type: 'replace'}})
      // const merge4 = new Merge({array: {type: 'push', filter: true}})
      // const merge5 = new Merge({array: {type: 'push', filter: false}})
      // const merge6 = new Merge({array: {type: 'unshift', filter: true}})
      // const merge7 = new Merge({array: {type: 'unshift', filter: false}})
      // const merge8 = new Merge({array: {type: 'merge', merge: true}})
      // const merge9 = new Merge({array: {type: 'merge', merge: false}})

      expect(true).toBe(true)
    })
  })

  describe('#merge', () => {
    test('true', () => {
      expect(true).toBe(true)
    })
  })
})
