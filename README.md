# <p style="text-align: center"><span class="font-weight: bolder; font-size: 2em;">M</span>erge</p>

A util for merge object.


## → Install

```javascript
$ yarn add @blackcater/merge
```


## → Usage

```javascript
import { merge } from '@blackcater/merge'

merge(1, 2) // 2

merge({ a: 1 }, { b: 2 }) // { a: 1, b: 2 }

merge([1, 2], [3, 4]) // [3, 4]

merge([1, 2], [3, 4], { type: 'merge' }) // [3, 4]

merge([1, { a: 2 }], [3, { b: 4 }], { type: 'merge' }) // [3, { a: 2, b: 4 }]
```


## → API

### new Merge(options)

Project export a `Merge` class. You can pass an options to control the merge category.

The default option is bellow:

```
{
  // options for merge array
  array: {
    // strategy for merging array. You can choose push/unshift/merge/replace
    type: 'replace',
    // target parameter must be an array
    array: true,
    // whether or not to filter the same element in source parameter
    filter: false,
    // whether or not to merge element, it works when `type` equals 'merge'
    merge: false,
    // whether null value is important, it works when `type` equals 'merge' and `merge` equals 'true'
    nullable: true,
    // whether undefined value is important, it works when `type` equals 'merge' and `merge` equals 'true'
    undefinable: true,
  },
  // options for merge object
  object: {
    // target parameter must be an object
    object: true,
    // whether null value is important
    nullable: true,
    // whether undefined value is important
    undefinable: true,
  },
}
```

### merge.merge(source, target, options)

The structure of `options` parameter is the same as Class Merge.

This is a wrapper of `merge.mergeArray` and `merge.mergeOject` function.

```javascript
import Merge from '@blackcater/merge'

const merge = new Merge()

merge.merge(1, 2) // 2

merge.merge([1], [2]) // [2]

merge.merge({ a: 1 }, { b: 2 }) // { a: 1, b: 2 }
```

### merge.mergeArray(source, target, options)

You can pass an options. Below is the default value of options

```
{
  // strategy for merging array. You can choose push/unshift/merge/replace
  type: 'replace',
  // target parameter must be an array
  array: true,
  // whether or not to filter the same element in source parameter
  filter: false,
  // whether or not to merge element, it works when `type` equals 'merge'
  merge: false,
  // whether null value is important, it works when `type` equals 'merge' and `merge` equals 'true'
  nullable: true,
  // whether undefined value is important, it works when `type` equals 'merge' and `merge` equals 'true'
  undefinable: true,
}
```

```javascript
import Merge from '@blackcater/merge'

const merge = new Merge()

merge.mergeArray([1, 2], 3) // 3
merge.mergeArray([1, 2], 3, { type: 'push' }) // [1, 2, 3]
merge.mergeArray([1, 2], 1, { type: 'push', filter: true }) // [2, 1]
merge.mergeArray([1, 2], [null, undefined], { type: 'merge' }) // [null, undefined]
merge.mergeArray([1, 2], [null, undefined], { type: 'merge', nullable: false }) // [1, undefined]
merge.mergeArray([1, 2], [null, undefined], { type: 'merge', nullable: false, undefinable: false }) // [1, 2]
```

### merge.mergeObject(source, target, options)

You can pass an options. Below is the default value of options

```
{
  // target parameter must be an object
  object: true,
  // whether null value is important
  nullable: true,
  // whether undefined value is important
  undefinable: true,
}
```

```javascript
import Merge from '@blackcater/merge'

const merge = new Merge()

merge.mergeObject({ a: 1 }, 3) // 3
merge.mergeObject({ a: 1 }, '1') // { 0: '1', a: 1 }
merge.mergeObject({ a: 1, b: 2 }, { a: 3, c: 4 }) // { a: 3, b: 2, c: 4 }
merge.mergeObject({ a: 1, b: 2 }, { a: null, b: undefined }) // { a: null, b: undefined }
merge.mergeObject({ a: 1, b: 2 }, { a: null, b: undefined }, { nullable: false }) // { a: 1, b: undefined }
merge.mergeObject({ a: 1, b: 2 }, { a: null, b: undefined }, { nullable: false, undefinable: false }) // { a: 1, b: 2 }
```

### Others

For convenience, project exports an instance of Merge.

```javascript
import { merge, mergeArray, mergeObject } from '@blackctaer/merge'
```

### License

[MIT@blackcater](LICENSE)
