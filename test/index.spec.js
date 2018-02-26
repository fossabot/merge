import Merge from '../src'

/* eslint-disable max-nested-callbacks */

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
    test('true', () => {
      expect(true).toBe(true)
    })
  })

  describe('#merge', () => {
    test('true', () => {
      expect(true).toBe(true)
    })
  })
})
