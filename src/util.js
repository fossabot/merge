export const isType = type => obj =>
  ({}.toString.call(obj).toLowerCase() === `[object ${type}]`)

export const isArray = isType('array')

export const isObject = isType('object')
