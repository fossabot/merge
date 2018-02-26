import * as util from './util'

/* eslint-disable */

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
        ...(options.array || {}),
      },
      object: {
        // 强制 target 为对象
        object: true,
        // null 值是否有意义
        nullable: true,
        // undefined 是否有意义
        undefinable: true,
        ...(options.object || {}),
      },
    }
  }

  merge(source, target) {
    // 数组合并
    if (util.isArray(source)) {
      return this.mergeArray(source, target, this.options.array)
    }

    // 对象合并
    if (util.isObject(source)) {
      return this.mergeObject(source, target, this.options.object)
    }

    return target
  }

  /**
   * 数组合并
   *
   * @param source {Array}
   * @param target {Any}
   * @param options {Object}
   */
  mergeArray(source, target, options = {}) {
    // 强制 target 为 array
    if (options.array && !util.isArray(target)) {
      return target
    }

    // replace 替换
    if (options.type === 'replace') {
      return target
    }

    const targetList = util.isArray(target) ? target : [target]
    const list = [...source]
    const temp = []

    for (let i = 0, len = targetList.length; i < len; i++) {
      const index = list.indexOf(targetList[i])

      if (options.type === 'push' || options.type === 'unshift') {
        // 移除共有元素
        if (options.filter && index !== -1) {
          list.splice(index, 1)
        } else {
          temp.push(targetList[i])
        }
      } else if (options.type === 'merge') {
        if (options.merge) {
          list[i] = merge(
            list[i],
            targetList[i],
            util.isObject(options.merge) ? options.merge : {}
          )
        } else if (
          options.nullable ||
          targetList[i] !== null ||
          (options.undefinable || targetList[i] !== undefined)
        ) {
          list[i] = targetList[i]
        }
      }
    }

    if (temp.length > 0) {
      return options.type === 'unshift' ? temp.concat(list) : list.concat(temp)
    } else {
      return list
    }
  }

  /**
   * 对象合并
   *
   * @param source
   * @param target
   * @param options
   */
  mergeObject(source, target, options = {}) {
    // 强制 target 为 object
    if (options.object && !util.isObject(target)) {
      return target
    }

    const result = { ...source }
    const targetObject = Object.assign({}, target)

    for (const key in targetObject) {
    }
  }
}
