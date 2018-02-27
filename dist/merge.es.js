const isType = function isType(type) {
  return function(obj) {
    return {}.toString.call(obj).toLowerCase() === `[object ${ type }]`
  }
}

const isArray = isType('array')

const isObject = isType('object')

const isIterable = function isIterable(object) {
  return object !== null && typeof object[Symbol.iterator] === 'function'
}

const _createClass = (function() {
  function defineProperties(target, props) {
    for (let i = 0; i < props.length; i++) {
      const descriptor = props[i]
      descriptor.enumerable = descriptor.enumerable || false
      descriptor.configurable = true
      if ('value' in descriptor) {
        descriptor.writable = true
      }
      Object.defineProperty(target, descriptor.key, descriptor)
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) {
      defineProperties(Constructor.prototype, protoProps)
    }
    if (staticProps) {
      defineProperties(Constructor, staticProps)
    }
    return Constructor
  }
}())

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i]
    }
    return arr2
  }
  return Array.from(arr)

}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

/* eslint-disable complexity */

/**
 * merge source and target
 *
 * @param options
 */

const Merge = (function() {
  function Merge() {
    const options =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}

    _classCallCheck(this, Merge)

    this.options = {
      array: {
        // push | unshift | merge | replace
        type: 'replace',
        // 是否强制 target 为数组
        array: true,
        // 是否去除共有元素
        filter: false,
        // 是否对子元素进行 merge 操作
        merge: false,
        // null 值是否有意义
        nullable: true,
        // undefined 是否有意义
        undefinable: true,
        ...(options.array || {})
      },
      object: {
        // 强制 target 为对象
        object: true,
        // null 值是否有意义
        nullable: true,
        // undefined 是否有意义
        undefinable: true,
        ...(options.object || {})
      }
    }
  }

  _createClass(Merge, [
    {
      key: 'merge',
      value: function merge(source, target) {
        const options =
          arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {}

        // 数组合并
        if (isArray(source)) {
          return this.mergeArray(source, target, {
            ...this.options.array,
            ...(options.array || {})
          })
        }

        // 对象合并
        if (isObject(source)) {
          return this.mergeObject(source, target, {
            ...this.options.object,
            ...(options.object || {})
          })
        }

        return target
      }

      /**
       * 数组合并
       *
       * @param source
       * @param target
       * @param options
       */
    },
    {
      key: 'mergeArray',
      value: function mergeArray(source, target) {
        const options =
          arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {}

        const opts = {
          ...this.options.array,
          ...options
        }

        if (!isArray(source)) {
          throw new Error('`source` should be an array')
        }

        // 强制 target 为 array
        if (opts.type === 'replace' && opts.array && !isArray(target)) {
          return target
        }

        const targetList = isArray(target) ?
          target :
          isIterable(target) ?
            [].concat(_toConsumableArray(target)) :
            [target]
        const list = [].concat(_toConsumableArray(source))
        const temp = []

        if (opts.type === 'replace') {
          return targetList
        }

        for (let i = 0, len = targetList.length; i < len; i++) {
          const index = list.indexOf(targetList[i])

          if (opts.type === 'push' || opts.type === 'unshift') {
            // 移除共有元素
            if (opts.filter && index !== -1) {
              list.splice(index, 1)
              temp.push(targetList[i])
            } else {
              temp.push(targetList[i])
            }
          } else if (opts.type === 'merge') {
            if (opts.merge) {
              list[i] = this.merge(list[i], targetList[i])
            } else if (
              (opts.nullable || targetList[i] !== null) &&
              (opts.undefinable || targetList[i] !== undefined)
            ) {
              list[i] = targetList[i]
            }
          }
        }

        if (temp.length > 0) {
          return opts.type === 'unshift' ? temp.concat(list) : list.concat(temp)
        }

        return list
      }

      /**
       * 对象合并
       *
       * @param source
       * @param target
       * @param options
       */
    },
    {
      key: 'mergeObject',
      value: function mergeObject(source, target) {
        const options =
          arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {}

        const opts = {
          ...this.options.object,
          ...options
        }

        if (!isObject(source)) {
          throw new Error('`source` should be an object')
        }

        // 强制 target 为 object
        if (opts.object && !isObject(target)) {
          return target
        }

        const result = {...source}
        const targetObject = Object.assign({}, target)

        for (const key in targetObject) {
          if (
            (opts.nullable || targetObject[key] !== null) &&
            (opts.undefinable || targetObject[key] !== undefined)
          ) {
            result[key] = this.merge(result[key], target[key])
          }
        }

        return result
      }
    }
  ])

  return Merge
}())

const merge = new Merge()
const mergeArray = merge.mergeArray.bind(merge)
const mergeObject = merge.mergeObject.bind(merge)

export default Merge
export {merge, mergeArray, mergeObject}
