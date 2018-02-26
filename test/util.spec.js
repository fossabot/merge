import * as util from '../src/util'

/* eslint-disable no-new-object */
test('#util.isArray', () => {
  expect(util.isArray(1)).toBe(false)
  expect(util.isArray(true)).toBe(false)
  expect(util.isArray('a')).toBe(false)
  expect(util.isArray([])).toBe(true)
  expect(util.isArray(new Array([]))).toBe(true)
  expect(util.isArray({})).toBe(false)
  expect(util.isArray(new Object({}))).toBe(false)
  expect(util.isArray(() => undefined)).toBe(false)
})

test('#util.isObject', () => {
  expect(util.isObject(1)).toBe(false)
  expect(util.isObject(true)).toBe(false)
  expect(util.isObject('a')).toBe(false)
  expect(util.isObject([])).toBe(false)
  expect(util.isObject(new Array([]))).toBe(false)
  expect(util.isObject({})).toBe(true)
  expect(util.isObject(new Object({}))).toBe(true)
  expect(util.isObject(() => undefined)).toBe(false)
})

test('util.isType', () => {
  expect(util.isType('number')(1)).toBe(true)
  expect(util.isType('boolean')(true)).toBe(true)
  expect(util.isType('string')('a')).toBe(true)
  expect(util.isType('array')([])).toBe(true)
  expect(util.isType('array')(new Array([]))).toBe(true)
  expect(util.isType('object')({})).toBe(true)
  expect(util.isType('object')(new Object({}))).toBe(true)
  expect(util.isType('function')(() => undefined)).toBe(true)
})
