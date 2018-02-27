export const isType = type => obj =>
  ({}.toString.call(obj).toLowerCase() === `[object ${type}]`)

export const isArray = isType('array')

export const isObject = isType('object')

export const isIterable = object =>
  object !== null && typeof object[Symbol.iterator] === 'function'
