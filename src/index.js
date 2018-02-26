import * as util from './util'

/* eslint-disable */

/**
 * 数组合并
 *
 * @param source {Array}
 * @param target {Any}
 * @param options {Object}
 */
function mergeArray(source, target, options = {}) {
  const opts = {
    // push | unshift | replace
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
    ...options,
  }

  // 强制 target 为 array 对象
  if (opts.array && !util.isArray(target)) {
    return target
  }

  const targetList = util.isArray(target) ? target : [target]
  const list = source.concat([])
  const temp = []

  for (let i = 0, len = targetList.length; i < len; i++) {
    const index = list.indexOf(targetList[i])

    if (opts.type === 'push' || opts.type === 'unshift') {
      // 移除共有元素
      if (opts.filter && index !== -1) {
        list.splice(index, 1)
      } else {
        temp.push(targetList[i])
      }
    } else if (opts.type === 'replace') {
      if (opts.merge) {
        list[i] = merge(
          list[i],
          targetList[i],
          util.isObject(opts.merge) ? opts.merge : {}
        )
      } else if (
        opts.nullable ||
        targetList[i] !== null ||
        (opts.undefinable || targetList[i] !== undefined)
      ) {
        list[i] = targetList[i]
      }
    }
  }

  if (temp.length > 0) {
    return opts.type === 'unshift' ? temp.concat(list) : list.concat(temp)
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
function mergeObject(source, target, options = {}) {
  const opts = {
    // null 值是否有意义
    nullable: true,
    // undefined 是否有意义
    undefinable: true,
  }
}

/**
 * merge source and target
 *
 * @param source
 * @param target
 * @param options
 */
export default function merge(source, target, options = {}) {
  // 数组合并
  if (util.isArray(source)) {
    return mergeArray(source, target, options)
  }

  // 对象合并
  if (util.isObject(source)) {
    return mergeObject(source, target, options)
  }

  return target
}
