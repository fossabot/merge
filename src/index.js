import * as util from './util'

/* eslint-disable */

/**
 * 数组合并
 *
 * @param source
 * @param target
 * @param options
 */
function mergeArray(source, target, options = {}) {
  const opts = {
    // push | unshift | replace | replace_push | replace_unshift
    type: 'replace',
    // 是否去除共有元素
    filter: true,
    // 是否对子元素进行 merge 操作
    merge: false,
    // null 值是否为空值
    nullable: true,
    // undefined 是否为空值
    undefinable: true,
    ...options,
  }
  const list = []
  const stack = []

  for (let i = 0, len = target.length; i < len; i++) {}
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
    nullable: false,
    // undefined 是否有意义
    undefinable: false,
    // 是否进行 hasOwnProperty 检测
    ownProperty: false,
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
  if (util.isArray(source) && util.isArray(target)) {
    return mergeArray(source, target, options)
  }

  // 对象合并
  if (util.isObject(source) && util.isObject(target)) {
    return mergeObject(source, target, options)
  }

  return target
}
