import * as util from './util'

/* eslint-disable complexity */

/**
 * merge source and target
 *
 * @param options
 */
export default class Merge {
  constructor(options = {}) {
    this.options = {
      array: {
        // push | unshift | merge | replace
        type: 'replace',
        // 是否强制 target 为数组
        array: true,
        // 是否去除共有元素
        filter: true,
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

  merge(source, target, options = {}) {
    // 数组合并
    if (util.isArray(source)) {
      return this.mergeArray(source, target, {
        ...this.options.array,
        ...options
      })
    }

    // 对象合并
    if (util.isObject(source)) {
      return this.mergeObject(source, target, {
        ...this.options.object,
        ...options
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
  mergeArray(source, target, options = {}) {
    const opts = {
      ...this.options.array,
      ...options
    }

    if (!util.isArray(source)) {
      throw new Error('`source` should be an array')
    }

    // 强制 target 为 array
    if (opts.type === 'replace' && opts.array && !util.isArray(target)) {
      return target
    }

    const targetList = util.isArray(target) ?
      target :
      util.isIterable(target) ? [...target] : [target]
    const list = [...source]
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
  mergeObject(source, target, options = {}) {
    const opts = {
      ...this.options.object,
      ...options
    }

    if (!util.isObject(source)) {
      throw new Error('`source` should be an object')
    }

    // 强制 target 为 object
    if (opts.object && !util.isObject(target)) {
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
